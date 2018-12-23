import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from '../module/core.module';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation';
import { routing } from './app.routes';
import { TableExampleComponent } from './tableExample/tableExample';
import { ListSelectorExampleComponent } from './listSelectorExample/listSelectorExample';
import { CheckboxExampleComponent } from './checkboxExample/checkboxExample';
import { StartupService } from '../module/services/startupService';
import { environment } from '../environments/environment';
import { LanguageService } from '../module/services/languageService';
import { TranslationService } from '../module/services/translationService';
import { ConfigurationService } from '../module/services/configurationService';
import { DatetimePickerExampleComponent } from './datetimePickerExample/datetimePickerExample';
import { ButtonExampleComponent } from './buttonExample/buttonExample';
import { PaginationExampleComponent } from './paginationExample/paginationExample';
import { DropdownExampleComponent } from './dropdownExample/dropdownExample';
import { TagInputExampleComponent } from './tagInputExample/tagInputExample';
import { ComboBoxExampleComponent } from './comboBoxExample/comboBoxExample';
import { TabsExampleComponent } from './tabsExample/tabsExample';
import { AccordionExampleComponent } from './accordionExample/accordionExample';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkflowNavBarExampleComponent } from './workflowBarExample/workflowNavBarExample';
import { WorkflowExampleComponent } from './workflowExample/workflowExample';
import { InputExampleComponent } from './inputExample/inputExample';
import { HtmlEditorExampleComponent } from './htmlEditorExample/htmlEditorExample';
import { SpinnerExampleComponent } from './spinnerExample/spinnerExample';
import { InfoboxExampleComponent } from './infoboxExample/infoboxExample';
import { DialogExampleComponent } from './dialogExample/dialogExample';
import { NumberInputExampleComponent } from './numberInputExample/numberInputExample';

export function startupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load(environment.configuration);
}

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        TableExampleComponent,
        ListSelectorExampleComponent,
        CheckboxExampleComponent,
        DatetimePickerExampleComponent,
        ButtonExampleComponent,
        PaginationExampleComponent,
        DropdownExampleComponent,
        TagInputExampleComponent,
        ComboBoxExampleComponent,
        TabsExampleComponent,
        AccordionExampleComponent,
        WorkflowNavBarExampleComponent,
        WorkflowExampleComponent,
        InputExampleComponent,
        HtmlEditorExampleComponent,
        SpinnerExampleComponent,
        InfoboxExampleComponent,
        DialogExampleComponent,
        NumberInputExampleComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        RouterModule,
        BrowserAnimationsModule,
        FormsModule,
        routing,
    ],
    providers: [
        ConfigurationService,
        LanguageService,
        TranslationService,
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: startupServiceFactory,
            deps: [StartupService],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
