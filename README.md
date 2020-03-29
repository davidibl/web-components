# ng web-components

Web-components is a lightweight angular 9 compatible component library. It should provide the majority of heavy used components.

## Usage

The library has to be added to the package.json:

```json
"@xnoname/web-components": "1.0.0",
```

To use the library the core module has to be added to the module of the host application.

```typescript
@NgModule({
    bootstrap: [...],
    declarations: [...],
    imports: [
        CoreModule,
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
        ...
    ],
})
```

Watch out to provide a startup service with some configuration values.

```typescript
    export function startupServiceFactory(startupService: StartupService): Function {
        return () => startupService.load(environment.configuration);
    }
```

At least the following configuration object is needed in order to get I18n to work and use features with text and labels involved.

```javascript
language: {
    default: 'DE',
    supported: 'DE'
}
```

As an alternative one can link the source repository directly in his angular app. Then these steps have to be followed:

```
npm install
npm start
```
will start a sample app on port 4200

To use library in project package json has to be extended by a link command:
```
link: "npm link ../web-components/src --production"
```

Further you have to enable preserve symlink option to enable testing with library.


## Demo

Find a demo of some of the components here:
https://webcomponents.xnoname.com


### Components:

- accordion
- blocking overlay
- button with primary flavour and a levitated button
- calendar
- checkbox form control
- chip
- collapsable panel
- combo box with and without input, custom templates and type-ahead
- content tile displaying content
- data table is a sortable searchable pageable table using custom row templates
- datetime picker form control supporting languages
- modal dialog
- dropdown form control
- html content element interacting with contentservice to display remote html content
- html editor is a basic html editor form control supporting headings, paragraphs and lists, formatting and auto-complete
- infobox is a big infobox with a icon
- input form control with validation result display
- like control
- list selector form control to select values of a list supporting custom templates for items
- a loading indicator
- menu header
- navigation link
- pagination control
- a path control to display breadcrumps
- popup button
- scroll panel
- scroll-to-top control
- section divider
- spinner
- tab control
- tag input form control
- tooltip
- workflow control
- context menu

### Directives

- google analytocs directive
- autofocus directive
- outside click directive

### Validators

- date format validator
- email validator
- min length validator
- not empty validator
- required validator

### Pipes

- pipe a configuration value
- filter objects
- join objects
- pipe object properties as array
- pipe an objkect property by its path
- pad
- pagination pipe
- sort pipe
- switch pipe
- to date string
- to timespan
- translation pipe

### Services

- analytics service
- calendar service
- content service resolving remote content
- filter objects array service
- language service
- loading indicator service to control global loading indication
- moment service to abstract moment library
- scroll service
- scroll spy service
- sort objects array service
- translation service
