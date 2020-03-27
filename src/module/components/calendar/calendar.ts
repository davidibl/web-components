import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Day } from '../../model/day';
import { Month } from '../../model/month';
import { Year } from '../../model/year';
import { CalendarService } from '../../services/calendarService';

@Component({
    selector: 'xn-calendar',
    templateUrl: 'calendar.html',
    styleUrls: ['calendar.scss'],
})
export class CalendarComponent implements OnInit {

    public selectedDateValue: Date;

    public currentMonth: Month;
    public months: Month[];
    public years: Year[];
    public weekdaysShort: string[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    public dayview: boolean;
    public monthview: boolean;
    public yearview: boolean;

    @HostBinding('class.animation')
    public animation = true;

    @HostBinding('class.animated-fast')
    public fastAnimation = true;

    @HostBinding('class.fade-in')
    public fadeInDown = true;

    @Output()
    public dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

    @Input()
    public set selectedDate(value: Date) {
        if (!value || <any>value === '' || value['setHours'] === undefined) {
            return;
        }

        value.setHours(12, 0, 0, 0);
        if ((!this.selectedDateValue) || this.selectedDateValue.getTime() !== value.getTime()) {
            this.selectedDateValue = value;
            this.currentMonth = this._calendarService.getMonthByDate(value);
        }
    }

    constructor(private _calendarService: CalendarService) { }

    public ngOnInit() {
        this.dayview = true;
        this.monthview = this.yearview = false;

        if (this.currentMonth === null || this.currentMonth === undefined) {
            this.selectedDate = new Date();
        }

        // this.weekdaysShort = this._calendarService.getWeekDaysShort();
        this.months = this._calendarService.getMonthList();
        this.years = this.getYearArray(this.currentMonth.year);
    }

    public onCurrentMonthClick() {
        this.dayview = this.yearview = false;
        this.monthview = true;
    }

    public onCurrentYearClick() {
        this.dayview = this.monthview = false;
        this.yearview = true;
    }

    public onMonthClick(month: Month) {
        this.currentMonth = this._calendarService.getMonthByMonthNumber(month.monthNumber, this.currentMonth.year);
        this.monthview = this.yearview = false;
        this.dayview = true;
    }

    public onYearClick(year: Year) {
        this.currentMonth = this._calendarService
            .getMonthByMonthNumber(this.currentMonth.monthNumber, year.getYearNumber());
        this.dayview = this.yearview = false;
        this.monthview = true;
        this.years = this.getYearArray(this.currentMonth.year);
    }

    public onDayClick(day: Day) {
        this.selectedDate = day.getDate();
        this.dateChanged.emit(day.getDate());
    }

    public onNextYearsClick() {
        if (this.dayview) {
            this.currentMonth = this._calendarService.getNextMonth(this.currentMonth.monthNumber, this.currentMonth.year);
            return;
        }
        this.years = this.getYearArray(this.years[this.years.length - 1].getYearNumber() + 6);
    }

    public onPreviousYearsClick() {
        if (this.dayview) {
            this.currentMonth = this._calendarService.getPreviousMonth(this.currentMonth.monthNumber, this.currentMonth.year);
            return;
        }
        this.years = this.getYearArray(this.years[0].getYearNumber() - 7);
    }

    public onTodayClick() {
        this.selectedDate = new Date();
        this.yearview = this.monthview = false;
        this.dayview = true;
    }

    private getYearArray(year: number): Year[] {
        let result = this._calendarService.getPreviousYears(year, 5);
        result = result.concat(this._calendarService.getNextYears(year, 6));
        return result;
    }

}
