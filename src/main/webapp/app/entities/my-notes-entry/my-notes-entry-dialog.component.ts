import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MyNotesEntry } from './my-notes-entry.model';
import { MyNotesEntryPopupService } from './my-notes-entry-popup.service';
import { MyNotesEntryService } from './my-notes-entry.service';

@Component({
    selector: 'jhi-my-notes-entry-dialog',
    templateUrl: './my-notes-entry-dialog.component.html'
})
export class MyNotesEntryDialogComponent implements OnInit {

    myNotesEntry: MyNotesEntry;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private myNotesEntryService: MyNotesEntryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.myNotesEntry.id !== undefined) {
            this.subscribeToSaveResponse(
                this.myNotesEntryService.update(this.myNotesEntry));
        } else {
            this.subscribeToSaveResponse(
                this.myNotesEntryService.create(this.myNotesEntry));
        }
    }

    private subscribeToSaveResponse(result: Observable<MyNotesEntry>) {
        result.subscribe((res: MyNotesEntry) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MyNotesEntry) {
        this.eventManager.broadcast({ name: 'myNotesEntryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-my-notes-entry-popup',
    template: ''
})
export class MyNotesEntryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private myNotesEntryPopupService: MyNotesEntryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.myNotesEntryPopupService
                    .open(MyNotesEntryDialogComponent as Component, params['id']);
            } else {
                this.myNotesEntryPopupService
                    .open(MyNotesEntryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
