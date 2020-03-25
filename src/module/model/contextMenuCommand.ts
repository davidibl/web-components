import { isNull } from '../functions/checks';

export class ContextMenuCommand {
    public constructor(
        public command: string,
        private _context: any,
    ) {}

    public getContext<T>(): T {
        if (isNull(this._context)) {
            return null;
        }
        return this._context as T;
    }
}
