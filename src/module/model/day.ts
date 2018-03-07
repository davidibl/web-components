import * as moment from 'moment';

export class Day {

    private _date: Date;
    public dayDisplay: string;
    public today = false;

    constructor(date?: moment.Moment) {
        this._date = date.toDate();

        if (this._date !== null) {
            if (this._date.setHours(12, 0, 0, 0) === new Date().setHours(12, 0, 0, 0)) {
                this.today = true;
            }
            this.dayDisplay = this.padDayLeft(date.date(), 2);
        }
    }

    public getDate(): Date {
        return this._date;
    }

    private padDayLeft(dayNumber: number, targetLength: number, fillString?: string) {
        return Array(targetLength - String(dayNumber).length + 1).join(fillString || '0') + dayNumber;
    }

}
