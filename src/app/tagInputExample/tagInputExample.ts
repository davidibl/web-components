import { Component } from '@angular/core';

@Component({
    selector: 'xn-tag-input-example',
    templateUrl: 'tagInputExample.html',
    styleUrls: ['tagInputExample.scss'],
})
export class TagInputExampleComponent {

    public tags = null;
    public predifinedTags = ['Hallo', 'Welt', 'hier sind', 'ein', 'paar', 'Tags'];
}
