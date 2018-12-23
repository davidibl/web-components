import { Component, OnChanges, Input, Optional, Self, Output, EventEmitter } from '@angular/core';
import { ControlContainer, ControlValueAccessor, AbstractControl, NgControl } from '@angular/forms';

@Component({
    selector: 'xn-tag-input',
    templateUrl: 'tagInput.html',
    styleUrls: ['tagInput.scss'],
})
export class TagInputComponent extends ControlContainer implements ControlValueAccessor {

    private _touched = false;
    private _currentText: string;

    public control: AbstractControl;
    private _tags = <string[]>[];

    public get tags() {
        if (!this._tags) {
            this._tags = [];
        }
        return this._tags;
    }

    public set currentText(text: string) {
        if (this.tags.indexOf(text) > -1) {
            this.setDuplicateError();
        } else {
            this.inputError = null;
        }
        this._currentText = text;
    }

    public get currentText() {
        return this._currentText;
    }

    public inputError = null;

    @Input()
    public noborder = false;

    @Input()
    public nomargin = false;

    @Input()
    public showChips = true;

    @Input()
    public placeholder = 'Neues Tag';

    @Output()
    public touchedChange = new EventEmitter<boolean>();

    @Input()
    public validatable = true;

    @Input('ngModel')
    public set model(value: string[]) {
        if (value && value !== this.tags) {
            this._tags = value;
        }
    }

    public get model(): string[] {
        return this.tags;
    }

    public constructor(@Optional() @Self() public ngControl: NgControl) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    public addTag() {
        if (!this.currentText || this.currentText === '' ||
            this.tags.indexOf(this.currentText) > -1) {
            return;
        }
        this.tags.push(this.currentText.trim());
        this.currentText = null;
        this._onChange(this.tags);
    }

    public removeLastTag() {
        if (!this.currentText || this.currentText === '') {
            this.tags.pop();
        }
        this._onChange(this.tags);
    }

    public onTagClick(tag: string) {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this._onChange(this.tags);
    }

    private setDuplicateError(): any {
        this.inputError = {
            duplicateEntry: {
                message: 'validation.message.duplicateEntry',
                order: 1
            }
        };
    }

    public writeValue(value: any): void {
        this._tags = value;
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

    public reset() {
        this._tags = null;
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
