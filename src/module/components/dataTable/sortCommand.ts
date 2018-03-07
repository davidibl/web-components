import { SortOrderType, SortOrder } from './sortOrder';

export class SortCommand {
    public constructor(
        public sortOrder: SortOrderType,
        public propertyPath: string) {}

    public sortHigher() {
        return (this.sortOrder === SortOrder.DESCENDING) ? -1 : 1;
    }

    public sortLower() {
        return (this.sortOrder === SortOrder.DESCENDING) ? 1 : -1;
    }
}
