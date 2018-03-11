import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: 'xn-like',
    templateUrl: 'like.html',
})
export class LikeComponent {

    @Input()
    public likes = 0;

    @Output()
    public likeClicked: EventEmitter<void> = new EventEmitter<void>();

    @HostListener('click')
    public onLikeClicked() {
        this.likeClicked.emit();
    }

}
