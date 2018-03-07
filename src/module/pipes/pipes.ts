import { ObjectPropertyPipe } from './objectPropertyPipe';
import { JoinObjectPipe } from './joinObjectPipe';
import { ObjectPropertiesPipe } from './objectPropertiesPipe';
import { FilterObjectsPipe } from './flterObjectsPipe';
import { SortPipe } from './sortPipe';
import { TranslationPipe } from './translationPipe';
import { PadPipe } from './padPipe';
import { ToDateStringPipe } from './toDateString';
import { TranslateEnumPipe } from './translateEnumPipe';
import { ConfigurationValuePipe } from './configurationValuePipe';
import { PaginationPipe } from './paginationPipe';
import { ToTimespanStringPipe } from './toTimespanString';
import { SwitchStringPipe } from './switchStringPipe';
import { SanitizeHtmlPipe } from './sanitizePipe';

export const ALL_PIPES = [
    TranslationPipe,
    PadPipe,
    ToDateStringPipe,
    TranslateEnumPipe,
    ConfigurationValuePipe,
    PaginationPipe,
    ToTimespanStringPipe,
    SortPipe,
    FilterObjectsPipe,
    ObjectPropertiesPipe,
    JoinObjectPipe,
    ObjectPropertyPipe,
    SwitchStringPipe,
    SanitizeHtmlPipe,
];
