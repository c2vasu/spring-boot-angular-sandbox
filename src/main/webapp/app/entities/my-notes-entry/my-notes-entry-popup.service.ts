import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MyNotesEntry } from './my-notes-entry.model';
import { MyNotesEntryService } from './my-notes-entry.service';

@Injectable()
export class MyNotesEntryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private myNotesEntryService: MyNotesEntryService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.myNotesEntryService.find(id).subscribe((myNotesEntry) => {
                    this.ngbModalRef = this.myNotesEntryModalRef(component, myNotesEntry);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.myNotesEntryModalRef(component, new MyNotesEntry());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    myNotesEntryModalRef(component: Component, myNotesEntry: MyNotesEntry): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.myNotesEntry = myNotesEntry;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
