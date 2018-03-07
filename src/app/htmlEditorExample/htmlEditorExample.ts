import { Component } from '@angular/core';

@Component({
    selector: 'xn-html-editor-example',
    templateUrl: 'htmlEditorExample.html',
})
export class HtmlEditorExampleComponent {

    public initialValue = '<p>Hallo Welt</p><p>Ich bins,<br />Der Versicherungsnehmer</p>';
    public value: string;

    public options = [
        { key: 'vn', value: 'Versicherungsnehmer' },
        { key: 'bz', value: 'Beitragszahler' },
        { key: 'rw', value: 'Rückkaufwert' },
        { key: 'vp', value: 'versicherte Person' },
        { key: 'vp1', value: 'versicherte Person 1' }
    ];
}
