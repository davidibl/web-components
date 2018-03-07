import { Injectable } from '@angular/core';
import { MomentService } from './momentService';
import { Year } from '../model/year';
import * as moment from 'moment';
import { Month } from '../model/month';
import { Day } from '../model/day';

@Injectable()
export class CalendarService {

    private _years: Year[] = new Array<Year>();

    public constructor(private _momentService: MomentService) { }

    public getMonthByMonthNumber(monthNumber: number, yearNumber: number) {
        return this.getMonth(this._momentService.moment().year(yearNumber).month(monthNumber));
    }

    public getNextMonth(monthNumber: number, yearNumber: number) {
        if (monthNumber === 11) {
            yearNumber++;
            monthNumber = 0;
        } else {
            monthNumber++;
        }
        return this.getMonthByMonthNumber(monthNumber, yearNumber);
    }

    public getPreviousMonth(monthNumber: number, yearNumber: number) {
        if (monthNumber === 0) {
            yearNumber--;
            monthNumber = 11;
        } else {
            monthNumber--;
        }
        return this.getMonthByMonthNumber(monthNumber, yearNumber);
    }

    public getMonthByDate(date: Date) {
        return this.getMonth(this._momentService.fromDate(date));
    }

    public getWeekDaysShort(): string[] {
        return this._momentService.localeData().weekdaysShort;
    }

    public getNextYears(year: number, count: number): Year[] {
        const result = new Array<Year>();
        for (let index = year + 1; index < year + count + 1; index++) {
            result.push(new Year(index));
        }
        return result;
    }

    public getPreviousYears(year: number, count: number): Year[] {
        const result = new Array<Year>();
        for (let index = year - count; index <= year; index++) {
            result.push(new Year(index));
        }
        return result;
    }

    public getMonthList() {
        const months = new Array<Month>();
        for (let index = 0; index < 12; index++) {
            months.push(new Month(index, this._momentService.moment().month(index).format('MMMM')));
        }
        return months;
    }

    private getMonth(date: moment.Moment): Month {
        const year = this.getOrCreateYear(date);
        const month = this.getOrCreateMonth(date, year);
        return month;
    }

    private getOrCreateMonth(date: moment.Moment, year: Year): Month {
        let month = year.getMonth(date.month());
        if (month === null || month === undefined) {
            month = this.createMonth(date);
            year.addMonth(month);
        }
        return month;
    }

    private getOrCreateYear(date: moment.Moment) {
        const yearNumber = date.year();
        let year = this._years.find((yearValue) => yearValue.getYearNumber() === yearNumber);
        if (year === null || year === undefined) {
            const newYear = year = this.createYear(yearNumber);
            this.addYear(newYear);
        }
        return year;
    }

    private createYear(yearNumber: number): Year {
        return new Year(yearNumber);
    }

    private addYear(year: Year) {
        this._years.push(year);
    }

    private createMonth(date: moment.Moment): Month {
        const month = new Month(date.month(), date.format('MMMM'), date.year());
        this.addDaysToMonth(month, date.year());
        return month;
    }

    private addDaysToMonth(month: Month, year: number) {
        const currentMonth = this._momentService.moment().year(year).month(month.getMonth());
        let weekNumber = currentMonth.date(1).weekday();
        let week = 0;
        for (let index = 0; index < currentMonth.daysInMonth(); index++) {
            const currentDay = currentMonth.date(index + 1);
            month.getWeek(week).push(this.createDay(currentDay));
            if (6 === currentDay.weekday()) {
                week++;
                weekNumber = currentDay.weekday();
            }
        }
    }

    private createDay(date: moment.Moment) {
        return new Day(date);
    }
}
