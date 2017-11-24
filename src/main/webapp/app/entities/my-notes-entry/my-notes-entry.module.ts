import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyNotesSharedModule } from '../../shared';
import {
    MyNotesEntryService,
    MyNotesEntryPopupService,
    MyNotesEntryComponent,
    MyNotesEntryDetailComponent,
    MyNotesEntryDialogComponent,
    MyNotesEntryPopupComponent,
    MyNotesEntryDeletePopupComponent,
    MyNotesEntryDeleteDialogComponent,
    myNotesEntryRoute,
    myNotesEntryPopupRoute,
    MyNotesEntryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...myNotesEntryRoute,
    ...myNotesEntryPopupRoute,
];

@NgModule({
    imports: [
        MyNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MyNotesEntryComponent,
        MyNotesEntryDetailComponent,
        MyNotesEntryDialogComponent,
        MyNotesEntryDeleteDialogComponent,
        MyNotesEntryPopupComponent,
        MyNotesEntryDeletePopupComponent,
    ],
    entryComponents: [
        MyNotesEntryComponent,
        MyNotesEntryDialogComponent,
        MyNotesEntryPopupComponent,
        MyNotesEntryDeleteDialogComponent,
        MyNotesEntryDeletePopupComponent,
    ],
    providers: [
        MyNotesEntryService,
        MyNotesEntryPopupService,
        MyNotesEntryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyNotesMyNotesEntryModule {}
