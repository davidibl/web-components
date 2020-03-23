import { Directive, Input, ElementRef, HostListener, Renderer2, OnDestroy } from '@angular/core';

@Directive({
    selector: '[xnTooltip]'
})
export class TooltipDirective implements OnDestroy {

    @Input()
    public xnTooltip: string;

    @Input()
    public placement: string;

    @Input()
    public delay = 10;

    public tooltipElement: HTMLElement;

    public offset = 10;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) { }

    public ngOnDestroy(): void {
        if (this.tooltipElement) {
            this.renderer.removeChild(document.body, this.tooltipElement);
            this.tooltipElement = null;
        }
    }

    @HostListener('mouseenter')
    public onMouseEnter() {
        if (!this.tooltipElement) { this.show(); }
    }

    @HostListener('mouseleave')
    public onMouseLeave() {
        if (this.tooltipElement) { this.hide(); }
    }

    private show() {
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltipElement, 'xn-tooltip-show');
    }

    private hide() {
        this.renderer.removeClass(this.tooltipElement, 'xn-tooltip-show');
        window.setTimeout(() => {
            this.renderer.removeChild(document.body, this.tooltipElement);
            this.tooltipElement = null;
        }, this.delay);
    }

    private create() {
        this.tooltipElement = this.renderer.createElement('span');

        this.renderer.appendChild(
            this.tooltipElement,
            this.renderer.createText(this.xnTooltip)
        );

        this.renderer.appendChild(document.body, this.tooltipElement);

        this.renderer.addClass(this.tooltipElement, 'xn-tooltip');
        this.renderer.addClass(this.tooltipElement, `xn-tooltip-${this.placement}`);

        this.renderer.setStyle(this.tooltipElement, '-webkit-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltipElement, '-moz-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltipElement, '-o-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltipElement, 'transition', `opacity ${this.delay}ms`);
    }

    private setPosition() {
        const hostPosition = this.element.nativeElement.getBoundingClientRect();

        const tooltipPosition = this.tooltipElement.getBoundingClientRect();

        const scrollPosition =
            window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top, left;

        if (this.placement === 'top') {
            top = hostPosition.top - tooltipPosition.height - this.offset;
            left = hostPosition.left + (hostPosition.width - tooltipPosition.width) / 2;
        }

        if (this.placement === 'bottom') {
            top = hostPosition.bottom + this.offset;
            left = hostPosition.left + (hostPosition.width - tooltipPosition.width) / 2;
        }

        if (this.placement === 'left') {
            top = hostPosition.top + (hostPosition.height - tooltipPosition.height) / 2;
            left = hostPosition.left - tooltipPosition.width - this.offset;
        }

        if (this.placement === 'right') {
            top = hostPosition.top + (hostPosition.height - tooltipPosition.height) / 2;
            left = hostPosition.right + this.offset;
        }

        this.renderer.setStyle(this.tooltipElement, 'top', `${top + scrollPosition}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    }
}
