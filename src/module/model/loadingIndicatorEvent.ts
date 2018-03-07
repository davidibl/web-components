export class LoadingIndicatorEvent {

    public message: string;
    public open: boolean;

    constructor(message: string, open: boolean) {
        this.message = message;
        this.open = open;
    }
}
