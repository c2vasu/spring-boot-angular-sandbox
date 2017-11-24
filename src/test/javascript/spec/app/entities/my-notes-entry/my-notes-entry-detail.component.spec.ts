/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MyNotesTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MyNotesEntryDetailComponent } from '../../../../../../main/webapp/app/entities/my-notes-entry/my-notes-entry-detail.component';
import { MyNotesEntryService } from '../../../../../../main/webapp/app/entities/my-notes-entry/my-notes-entry.service';
import { MyNotesEntry } from '../../../../../../main/webapp/app/entities/my-notes-entry/my-notes-entry.model';

describe('Component Tests', () => {

    describe('MyNotesEntry Management Detail Component', () => {
        let comp: MyNotesEntryDetailComponent;
        let fixture: ComponentFixture<MyNotesEntryDetailComponent>;
        let service: MyNotesEntryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyNotesTestModule],
                declarations: [MyNotesEntryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MyNotesEntryService,
                    JhiEventManager
                ]
            }).overrideTemplate(MyNotesEntryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MyNotesEntryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MyNotesEntryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MyNotesEntry(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.myNotesEntry).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
