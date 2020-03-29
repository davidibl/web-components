import { NavigationGroup } from './navigation/navigationGroup';
export const NAVIGATION_DEFINITION: { [key: string]: NavigationGroup } = {
    forms: {
        title: 'Formularkomponenten',
        items: [
            { link: '/input', name: 'Text' },
            { link: '/number', name: 'Zahlen' },
            { link: '/datetime', name: 'Datum' },
            { link: '/checkbox', name: 'Checkbox' },
            { link: '/combobox', name: 'Combobox' },
            { link: '/dropdown', name: 'Auswahl' },
            { link: '/taginput', name: 'Tags' },
            { link: '/listSelector', name: 'Listenselektion' }
        ]
    },
    buttons: {
        title: 'Buttons and Indicators',
        items: [
            { link: '/buttons', name: 'Standardbuttons' },
            { link: '/toggle', name: 'Toggle Buttons'},
            { link: '/spinner', name: 'Spinner' },
        ]
    },
    table: {
        title: 'Tabellen',
        items: [
            { link: '/table', name: 'Tabellen' },
            { link: '/pagination', name: 'Pagination' }
        ]
    },
    layout: {
        title: 'Layout und Workflow',
        items: [
            { link: '/tabs', name: 'Tabs' },
            { link: '/accordion', name: 'Accordion' },
            { link: '/workflownav', name: 'Workflow Navigation' },
            { link: '/workflow', name: 'Workflow Accordion' }
        ]
    },
    popups: {
        title: 'Popups und Modale',
        items: [
            { link: '/dialog', name: 'Dialoge' },
            { link: '/infobox', name: 'Infobox' },
            { link: '/tooltip', name: 'Tooltip' },
            { link: '/context-menu', name: 'Kontextmenü'}
        ]
    }
}
