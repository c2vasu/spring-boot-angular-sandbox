import { BaseEntity } from './../../shared';

export class MyNotesEntry implements BaseEntity {
    constructor(
        public id?: number,
        public note?: string,
    ) {
    }
}
