import { Month } from './month';

export class Year {

    private _months = new Array<Month>();
    private _yearNumber: number;

    constructor(year: number) {
        this._yearNumber = year;
    }

    public addMonth(month: Month) {
        this._months.push(month);
    }

    public getYearNumber(): number {
        return this._yearNumber;
    }

    public getMonth(monthIndex: number): Month {
        return this._months.find((monthElement) => monthElement.getMonth() === monthIndex);
    }

}
