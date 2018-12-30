import { MyRequiredValidatorDirective } from './validators/requiredValidator';
import { OutsideClickDirective } from './outsideClick';
import { ScrollSpyDirective } from './scrollSpyWindow';
import { EmailValidatorDirective } from './validators/emailValidator';
import { DateFormatValidatorDirective } from './validators/dateFormatValidator';
import { MinLengthValidatorDirective } from './validators/minLengthValidator';
import { ShowScrollDirective } from './scrollShowDirective';
import { AutofocusDirective } from './autofocus';
import { AnalyticsDirective } from './analytics';
import { NotEmptyValidatorDirective } from './validators/notEmptyValidator';
import { IfNullDirective } from './ifNull';
import { IfFalseDirective } from './ifFalse';

export const ALL_DIRECTIVES = [
    OutsideClickDirective,
    ScrollSpyDirective,
    EmailValidatorDirective,
    DateFormatValidatorDirective,
    MinLengthValidatorDirective,
    ShowScrollDirective,
    AutofocusDirective,
    AnalyticsDirective,
    MyRequiredValidatorDirective,
    NotEmptyValidatorDirective,
    IfNullDirective,
    IfFalseDirective,
];
