import { StartupService } from './startupService';
import { UserprofileService } from './userprofileService';
import { SortObjectsService } from './sortObjectsService';
import { TranslationService } from './translationService';
import { NavigationService } from './navigationService';
import { MomentService } from './momentService';
import { ScrollSpyService } from './scrollSpyService';
import { ScrollService } from './scrollService';
import { LoadingIndicatorService } from './loadingIndicatorService';
import { ContentService } from './contentService';
import { LanguageService } from './languageService';
import { CalendarService } from './calendarService';
import { AnalyticsService } from './analyticsService';
import { FilterObjectService } from './filterObjectsService';

export const ALL_SERVICES = [
    TranslationService,
    NavigationService,
    MomentService,
    ScrollSpyService,
    ScrollService,
    LoadingIndicatorService,
    ContentService,
    LanguageService,
    CalendarService,
    AnalyticsService,
    SortObjectsService,
    FilterObjectService,
    UserprofileService,
    StartupService,
];
