import {
    Component,
    Renderer2,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Optional,
    Self,
    EventEmitter,
    Output,
    Input
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
    ControlContainer,
    ControlValueAccessor,
    NgControl,
    AbstractControl
} from '@angular/forms';

@Component({
    selector: 'xn-html-editor',
    templateUrl: 'htmlEditor.html',
    styleUrls: ['htmlEditor.scss'],
})
export class HtmlEditorComponent extends ControlContainer implements ControlValueAccessor, AfterViewInit {

    @ViewChild('editorElement')
    private _editorElement: ElementRef;
    private _value: string;
    private _touched = false;
    private _isIE = this.isIE();
    private _toolsetHovered = false;

    public control: AbstractControl;

    @Output()
    public touchedChange = new EventEmitter<boolean>();

    public boxXPosition = 0;
    public boxYPosition = 0;
    public hasFocus = false;
    public showToolset = false;
    public selectedTool: string;

    @Input('ngModel')
    public set model(value: any) {
        this._value = value;
    }

    @Input()
    public set predictionOptions(options: {key: string, value: string}[]) {
        this.predictions.options = options;
    }

    public get model(): any {
        return this._value;
    }

    @Output()
    public focus: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public blur: EventEmitter<void> = new EventEmitter<void>();

    public predictions = new Predictions();

    public setToolsetHovered(toolsetHovered: boolean) {
        this._toolsetHovered = toolsetHovered;
    }

    public get toolsetHovered() {
        return this._toolsetHovered;
    }

    public constructor(private _renderer: Renderer2,
        @Optional() @Self() public ngControl: NgControl) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    public onFocus(): void {
        this.hasFocus = true;
        this.focus.emit();

        if (this._value) {
            return;
        }

        if (!this._isIE) {
            const element = new EditorElement(this._editorElement.nativeElement);
            if (element.getElements().length === 0) {
                const newElement = this._renderer.createElement('p');
                this._renderer.appendChild(this._editorElement.nativeElement, newElement);
            }
        }
    }

    public onBlur(): void {
        this._onChange(this._value);
        this.hasFocus = false;
        this.setTouchedIfNot();
        this._onBlur();
        this.blur.emit(null);
    }

    public reset(value?: any) {
        this.writeValue(null);
        this._touched = false;
    }

    public writeValue(value: any): void {
        this._value = value;
    }

    public registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }
    public registerOnBlur(fn: () => void): void {
        this._onBlur = fn;
    }

    public ngAfterViewInit() {
        if (this._value) {
            this._editorElement.nativeElement.innerHTML = this._value;
        }
        document.addEventListener('selectionchange', () => this.resetCaretPosition());
        document.execCommand('enableObjectResizing', false, "false");
        this._renderer.setAttribute(this._editorElement.nativeElement, 'contentEditable', 'true');
        this._renderer.listen(this._editorElement.nativeElement, 'keydown',
            (event) => this.onKeyDown(event, this._editorElement.nativeElement));
        this._renderer.listen(this._editorElement.nativeElement, 'keyup',
            (event) => this.onKeyUp(event, this._editorElement.nativeElement));
    }

    public format(formatType: string, event?: MouseEvent) {
        if (formatType.startsWith('<')) {
            document.execCommand('formatBlock', false, formatType);
        }
        document.execCommand(formatType, false);
        if (event) {
            event.stopPropagation();
        }
        this.selectedTool = formatType;
        of('null').pipe(delay(250))
            .subscribe(() => this.selectedTool = null);
    }

    private onKeyUp(event: KeyboardEvent, element) {
        if (this._isIE) {
            this.resetCaretPosition();
        }

        if (event.which === 38 || event.which === 40 || event.which === 27) {
            return;
        }

        const currentSelection = document.getSelection();
        const currentText = currentSelection.anchorNode.textContent;
        let i = currentSelection.baseOffset;
        if (this._isIE) {
            const range = currentSelection.getRangeAt(0);
            i = range.startOffset;
        }
        let currentWord = '';
        while (i > 0 && !/\s/.test(currentText[i - 1])) {
            currentWord = currentText[i - 1] + currentWord;
            i--;
        }
        this.predictions.currentWord = currentWord;

        if (document.getSelection().anchorNode.nodeName === 'div') {
            this.format('<p>');
        }

        this._value = element.innerHTML;
        this._onChange(this._value);
    }

    private resetCaretPosition() {
        this.showToolset = document.getSelection().toString().length > 1;
        const position = this.calculateCaretPosition(window);
        this.boxXPosition = position.left;
        this.boxYPosition = position.top + 30;
    }

    private onKeyDown(event: KeyboardEvent, element) {
        const elementWrapper = new EditorElement(element);
        if (this.isDeleteCommand(event.which)) {
            if (elementWrapper.isLastElement()) {
                if (elementWrapper.getFirstElement().textContent.length === 0) {
                    if (this._isIE) {
                        this.setCursorPosition(document.getSelection().anchorNode, 0);
                    }
                    elementWrapper.getFirstElement().innerHTML = '';
                    event.preventDefault();
                    return;
                }
            }
        }

        if (event.ctrlKey) {
            switch (event.which) {
                case 66:
                    this.format('bold');
                    event.preventDefault();
                    return;
                case 73:
                    this.format('italic');
                    event.preventDefault();
                    return;
                case 85:
                    this.format('underline');
                    event.preventDefault();
                    return;
                case 49:
                    this.format('<h1>');
                    event.preventDefault();
                    return;
                case 50:
                    this.format('<h2>');
                    event.preventDefault();
                    return;
                case 51:
                    this.format('<h3>');
                    event.preventDefault();
                    return;
                case 48:
                    this.format('<p>');
                    event.preventDefault();
                    return;
                case 76:
                    this.format('insertunorderedlist');
                    event.preventDefault();
                    return;
            }
        }

        switch (event.which) {
            case 38:
                if (this.predictions.isOpen) {
                    this.predictions.selectPrevious();
                    event.preventDefault();
                }
                break;
            case 40:
                if (this.predictions.isOpen) {
                    this.predictions.selectNext();
                    event.preventDefault();
                }
                break;
            case 27:
                this.predictions.resetCurrentWord();
                break;
            case 13:
                if (this.predictions.isOpen) {
                    if (this._isIE) {
                        this.insertPredictionIE(this.predictions.currentWord, this.predictions.selectedPrediction,
                            document.getSelection().anchorNode);
                    } else {
                        this.insertPrediction(this.predictions.currentWord, this.predictions.selectedPrediction);
                    }
                    event.preventDefault();
                }
                break;
        }
    }

    private isIE() {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
    }

    private insertPrediction(predictedWord: string, selectedPrediction: string) {
        const selection = document.getSelection();
        const newSelectionStart = selection.anchorOffset - predictedWord.length;
        const newSelectionEnd = newSelectionStart + predictedWord.length;
        selection.setBaseAndExtent(selection.anchorNode, newSelectionStart, selection.anchorNode, newSelectionEnd);
        document.execCommand('insertText', false, selectedPrediction);
        this.predictions.resetCurrentWord();
    }

    private insertPredictionIE(predictedWord: string, selectedPrediction: string, element: any) {
        const currentCaretPosition = document.getSelection().focusOffset;
        const part1 = element.textContent.substr(0, currentCaretPosition - predictedWord.length);
        const part2 = element.textContent.substr(currentCaretPosition);
        const prefix = part1 + selectedPrediction;
        element.textContent = prefix + part2;
        this.setCursorPosition(element, prefix.length);
    }

    private setCursorPosition(element: any, index: number) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(element, index);
        range.setEnd(element, index);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    private calculateCaretPosition(element, offsetx?, offsety?) {
        offsetx = offsetx || 0;
        offsety = offsety || 0;

        let nodeLeft = 0, nodeTop = 0;
        if (element) {
            nodeLeft = element.offsetLeft;
            nodeTop = element.offsetTop;
        }

        const position = { left: 0, top: 0 };

        if ((<any>document).selection) {
            const range = (<any>document).selection.createRange();
            position.left = range.offsetLeft + offsetx;
            position.top = range.offsetTop + offsety;
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0).cloneRange();
            try {
                range.setStart(range.startContainer, range.startOffset - 1);
            } catch (e) { }

            const rect = range.getBoundingClientRect();
            if (range.endOffset === 0 || range.toString() === '') {
                if (range.startContainer === element) {
                    if (range.endOffset === 0) {
                        position.top = 0;
                        position.left = 0;
                    } else {
                        const range2 = range.cloneRange();
                        range2.setStart(range2.startContainer, 0);
                        const rect2 = range2.getBoundingClientRect();
                        position.left = rect2.left + offsetx;
                        position.top = rect2.top + rect2.height + offsety;
                    }
                } else {
                    position.top = (<any>range.startContainer).offsetTop;
                    position.left = (<any>range.startContainer).offsetLeft;
                }
            } else {
                position.left = rect.left + rect.width + offsetx;
                position.top = rect.top + offsety;
            }
        }
        return position;
    }

    private isDeleteCommand(key: number) {
        return key === 8 || key === 46;
    }

    private _onChange = (_: any) => void 0;
    private _onTouched = () => void 0;
    private _onBlur = () => void 0;

    private setTouchedIfNot(): void {
        if (!this.ngControl.touched) {
            this._touched = true;
            this.ngControl.control.markAsTouched();
            this._onTouched();
            this.touchedChange.emit(this._touched);
        }
    }
}

export class EditorElement {

    public constructor(private _element) {
    }

    public isLastElement() {
        return this.getElements().length === 1;
    }

    public getFirstElement() {
        return this.getElements()[0];
    }

    public getElements() {
        return this.filterNodes(this._element.childNodes, element => element.nodeType === 1);
    }

    private filterNodes(nodes, filter: (any) => boolean) {
        const result = [];
        for (let i = 0; i < nodes.length; i++) {
            if (filter(nodes[i])) {
                result.push(nodes[i]);
            }
        }
        return result;
    }

}

export class Predictions {

    private _currentWord = '';
    private _avaiable = <string[]>[];
    private _selectedIndex = 0;

    private _options = [];

    public get currentWord() {
        return this._currentWord;
    }

    public get selectedPrediction() {
        return this._avaiable[this.selectedIndex];
    }

    public get selectedIndex() {
        return this._selectedIndex;
    }

    public get avaiable() {
        return this._avaiable;
    }

    public set currentWord(word: string) {
        this._currentWord = word;
        this.predict();
    }

    public resetCurrentWord() {
        this._currentWord = '';
        this.predict();
    }

    public get isOpen() {
        return this._avaiable.length > 0;
    }

    public selectNext() {
        ++this._selectedIndex;
        if (this._selectedIndex === this._avaiable.length) {
            this._selectedIndex = 0;
        }
    }

    public selectPrevious() {
        --this._selectedIndex;
        if (this._selectedIndex === -1) {
            this._selectedIndex = this._avaiable.length - 1;
        }
    }

    public set options(options: {key: string, value: string}[]) {
        this._options = options;
    }

    private predict() {
        this._selectedIndex = 0;
        if (!this._currentWord || this._currentWord === '') {
            this._avaiable = [];
            return;
        }

        this._avaiable = this._options
            .filter(prediction => prediction.key.indexOf(this._currentWord) > -1)
            .map(prediction => prediction.value);
    }

}
