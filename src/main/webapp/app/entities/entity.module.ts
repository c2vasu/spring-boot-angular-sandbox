import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyNotesMyNotesEntryModule } from './my-notes-entry/my-notes-entry.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyNotesMyNotesEntryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyNotesEntityModule {}
