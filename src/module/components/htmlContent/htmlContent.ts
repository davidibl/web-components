import { Component, Input } from '@angular/core';
import { ContentService } from '../../services/contentService';

@Component({
    selector: 'html-content',
    templateUrl: 'htmlContent.html',
})
export class HtmlContentComponent {

    public content: string;

    public constructor(private _contentService: ContentService) { }

    @Input()
    public set path(message: string) {
        this._contentService.getContent(message).subscribe(content => this.content = content);
    }

}
