import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MyNotesEntry } from './my-notes-entry.model';
import { MyNotesEntryService } from './my-notes-entry.service';

@Component({
    selector: 'jhi-my-notes-entry-detail',
    templateUrl: './my-notes-entry-detail.component.html'
})
export class MyNotesEntryDetailComponent implements OnInit, OnDestroy {

    myNotesEntry: MyNotesEntry;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private myNotesEntryService: MyNotesEntryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMyNotesEntries();
    }

    load(id) {
        this.myNotesEntryService.find(id).subscribe((myNotesEntry) => {
            this.myNotesEntry = myNotesEntry;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMyNotesEntries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'myNotesEntryListModification',
            (response) => this.load(this.myNotesEntry.id)
        );
    }
}
