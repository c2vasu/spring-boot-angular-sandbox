import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('MyNotesEntry e2e test', () => {

    let navBarPage: NavBarPage;
    let myNotesEntryDialogPage: MyNotesEntryDialogPage;
    let myNotesEntryComponentsPage: MyNotesEntryComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MyNotesEntries', () => {
        navBarPage.goToEntity('my-notes-entry');
        myNotesEntryComponentsPage = new MyNotesEntryComponentsPage();
        expect(myNotesEntryComponentsPage.getTitle()).toMatch(/myNotesApp.myNotesEntry.home.title/);

    });

    it('should load create MyNotesEntry dialog', () => {
        myNotesEntryComponentsPage.clickOnCreateButton();
        myNotesEntryDialogPage = new MyNotesEntryDialogPage();
        expect(myNotesEntryDialogPage.getModalTitle()).toMatch(/myNotesApp.myNotesEntry.home.createOrEditLabel/);
        myNotesEntryDialogPage.close();
    });

    it('should create and save MyNotesEntries', () => {
        myNotesEntryComponentsPage.clickOnCreateButton();
        myNotesEntryDialogPage.setNoteInput('note');
        expect(myNotesEntryDialogPage.getNoteInput()).toMatch('note');
        myNotesEntryDialogPage.save();
        expect(myNotesEntryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MyNotesEntryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-my-notes-entry div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MyNotesEntryDialogPage {
    modalTitle = element(by.css('h4#myMyNotesEntryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    noteInput = element(by.css('input#field_note'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNoteInput = function (note) {
        this.noteInput.sendKeys(note);
    }

    getNoteInput = function () {
        return this.noteInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
