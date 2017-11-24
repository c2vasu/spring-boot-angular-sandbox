import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MyNotesEntry } from './my-notes-entry.model';
import { MyNotesEntryPopupService } from './my-notes-entry-popup.service';
import { MyNotesEntryService } from './my-notes-entry.service';

@Component({
    selector: 'jhi-my-notes-entry-delete-dialog',
    templateUrl: './my-notes-entry-delete-dialog.component.html'
})
export class MyNotesEntryDeleteDialogComponent {

    myNotesEntry: MyNotesEntry;

    constructor(
        private myNotesEntryService: MyNotesEntryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.myNotesEntryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'myNotesEntryListModification',
                content: 'Deleted an myNotesEntry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-my-notes-entry-delete-popup',
    template: ''
})
export class MyNotesEntryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private myNotesEntryPopupService: MyNotesEntryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.myNotesEntryPopupService
                .open(MyNotesEntryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
