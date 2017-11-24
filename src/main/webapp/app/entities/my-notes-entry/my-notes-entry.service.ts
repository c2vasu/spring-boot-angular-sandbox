import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { MyNotesEntry } from './my-notes-entry.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MyNotesEntryService {

    private resourceUrl = SERVER_API_URL + 'api/my-notes-entries';

    constructor(private http: Http) { }

    create(myNotesEntry: MyNotesEntry): Observable<MyNotesEntry> {
        const copy = this.convert(myNotesEntry);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(myNotesEntry: MyNotesEntry): Observable<MyNotesEntry> {
        const copy = this.convert(myNotesEntry);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MyNotesEntry> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to MyNotesEntry.
     */
    private convertItemFromServer(json: any): MyNotesEntry {
        const entity: MyNotesEntry = Object.assign(new MyNotesEntry(), json);
        return entity;
    }

    /**
     * Convert a MyNotesEntry to a JSON which can be sent to the server.
     */
    private convert(myNotesEntry: MyNotesEntry): MyNotesEntry {
        const copy: MyNotesEntry = Object.assign({}, myNotesEntry);
        return copy;
    }
}
