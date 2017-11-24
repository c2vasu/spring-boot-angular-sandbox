import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MyNotesEntryComponent } from './my-notes-entry.component';
import { MyNotesEntryDetailComponent } from './my-notes-entry-detail.component';
import { MyNotesEntryPopupComponent } from './my-notes-entry-dialog.component';
import { MyNotesEntryDeletePopupComponent } from './my-notes-entry-delete-dialog.component';

@Injectable()
export class MyNotesEntryResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const myNotesEntryRoute: Routes = [
    {
        path: 'my-notes-entry',
        component: MyNotesEntryComponent,
        resolve: {
            'pagingParams': MyNotesEntryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myNotesApp.myNotesEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'my-notes-entry/:id',
        component: MyNotesEntryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myNotesApp.myNotesEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const myNotesEntryPopupRoute: Routes = [
    {
        path: 'my-notes-entry-new',
        component: MyNotesEntryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myNotesApp.myNotesEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'my-notes-entry/:id/edit',
        component: MyNotesEntryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myNotesApp.myNotesEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'my-notes-entry/:id/delete',
        component: MyNotesEntryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myNotesApp.myNotesEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
