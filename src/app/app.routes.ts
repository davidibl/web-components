import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { TableExampleComponent } from './tableExample/tableExample';
import { ListSelectorExampleComponent } from './listSelectorExample/listSelectorExample';
import { CheckboxExampleComponent } from './checkboxExample/checkboxExample';
import { DatetimePickerExampleComponent } from './datetimePickerExample/datetimePickerExample';
import { ButtonExampleComponent } from './buttonExample/buttonExample';
import { PaginationExampleComponent } from './paginationExample/paginationExample';
import { DropdownExampleComponent } from './dropdownExample/dropdownExample';
import { TagInputExampleComponent } from './tagInputExample/tagInputExample';
import { ComboBoxExampleComponent } from './comboBoxExample/comboBoxExample';
import { TabsExampleComponent } from './tabsExample/tabsExample';
import { AccordionExampleComponent } from './accordionExample/accordionExample';
import { WorkflowNavBarExampleComponent } from './workflowBarExample/workflowNavBarExample';
import { WorkflowExampleComponent } from './workflowExample/workflowExample';
import { InputExampleComponent } from './inputExample/inputExample';
import { HtmlEditorExampleComponent } from './htmlEditorExample/htmlEditorExample';
import { SpinnerExampleComponent } from './spinnerExample/spinnerExample';
import { InfoboxExampleComponent } from './infoboxExample/infoboxExample';
import { DialogExampleComponent } from './dialogExample/dialogExample';
import { NumberInputExampleComponent } from './numberInputExample/numberInputExample';
import { TooltipExampleComponent } from './tooltipExample/tooltipExample';
import { ContextMenuExampleComponent } from './contextMenuExample/contextMenuExample';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'start' },
    { component: NavigationComponent, path: 'start'},
    { component: TableExampleComponent, path: 'table'},
    { component: ListSelectorExampleComponent, path: 'listSelector' },
    { component: CheckboxExampleComponent, path: 'checkbox' },
    { component: DatetimePickerExampleComponent, path: 'datetime' },
    { component: ButtonExampleComponent, path: 'buttons' },
    { component: PaginationExampleComponent, path: 'pagination' },
    { component: DropdownExampleComponent, path: 'dropdown' },
    { component: TagInputExampleComponent, path: 'taginput' },
    { component: ComboBoxExampleComponent, path: 'combobox' },
    { component: TabsExampleComponent, path: 'tabs' },
    { component: AccordionExampleComponent, path: 'accordion' },
    { component: WorkflowNavBarExampleComponent, path: 'workflownav' },
    { component: WorkflowExampleComponent, path: 'workflow' },
    { component: InputExampleComponent, path: 'input' },
    { component: HtmlEditorExampleComponent, path: 'editor' },
    { component: SpinnerExampleComponent, path: 'spinner' },
    { component: InfoboxExampleComponent, path: 'infobox' },
    { component: DialogExampleComponent, path: 'dialog' },
    { component: NumberInputExampleComponent, path: 'number' },
    { component: TooltipExampleComponent, path: 'tooltip' },
    { component: ContextMenuExampleComponent, path: 'context-menu' },
    { path: '**', redirectTo: 'start' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
