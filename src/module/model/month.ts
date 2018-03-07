import { Day } from './day';

export class Month {

    public days = new Array<Array<Day>>();
    public monthNumber: number;
    public year: number;
    public monthName: string;

    constructor(month: number, monthName: string, year?: number) {
        this.monthNumber = month;
        this.monthName = monthName;
        this.year = year;
    }

    public getMonth(): number {
        return this.monthNumber;
    }

    public getWeek(week: number) {
        if (this.days[week] === null || this.days[week] === undefined) {
            this.days[week] = new Array<Day>();
        }
        return this.days[week];
    }

}
