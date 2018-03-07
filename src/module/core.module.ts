import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ALL_PIPES } from './pipes/pipes';
import { ALL_SERVICES } from './services/services';
import { ALL_COMPONENTS } from './components/components';
import { ALL_DIRECTIVES } from './directives/directives';

@NgModule({
    declarations: [...ALL_PIPES, ...ALL_DIRECTIVES, ...ALL_COMPONENTS],
    exports: [...ALL_COMPONENTS, ...ALL_DIRECTIVES, ...ALL_PIPES],
    imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
    providers: [...ALL_SERVICES],
})
export class CoreModule {
}
