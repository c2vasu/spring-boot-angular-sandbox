package com.wsib.mynotes.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.wsib.mynotes.domain.MyNotesEntry;

import com.wsib.mynotes.repository.MyNotesEntryRepository;
import com.wsib.mynotes.web.rest.errors.BadRequestAlertException;
import com.wsib.mynotes.web.rest.util.HeaderUtil;
import com.wsib.mynotes.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MyNotesEntry.
 */
@RestController
@RequestMapping("/api")
public class MyNotesEntryResource {

    private final Logger log = LoggerFactory.getLogger(MyNotesEntryResource.class);

    private static final String ENTITY_NAME = "myNotesEntry";

    private final MyNotesEntryRepository myNotesEntryRepository;

    public MyNotesEntryResource(MyNotesEntryRepository myNotesEntryRepository) {
        this.myNotesEntryRepository = myNotesEntryRepository;
    }

    /**
     * POST  /my-notes-entries : Create a new myNotesEntry.
     *
     * @param myNotesEntry the myNotesEntry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new myNotesEntry, or with status 400 (Bad Request) if the myNotesEntry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/my-notes-entries")
    @Timed
    public ResponseEntity<MyNotesEntry> createMyNotesEntry(@Valid @RequestBody MyNotesEntry myNotesEntry) throws URISyntaxException {
        log.debug("REST request to save MyNotesEntry : {}", myNotesEntry);
        if (myNotesEntry.getId() != null) {
            throw new BadRequestAlertException("A new myNotesEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MyNotesEntry result = myNotesEntryRepository.save(myNotesEntry);
        return ResponseEntity.created(new URI("/api/my-notes-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /my-notes-entries : Updates an existing myNotesEntry.
     *
     * @param myNotesEntry the myNotesEntry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated myNotesEntry,
     * or with status 400 (Bad Request) if the myNotesEntry is not valid,
     * or with status 500 (Internal Server Error) if the myNotesEntry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/my-notes-entries")
    @Timed
    public ResponseEntity<MyNotesEntry> updateMyNotesEntry(@Valid @RequestBody MyNotesEntry myNotesEntry) throws URISyntaxException {
        log.debug("REST request to update MyNotesEntry : {}", myNotesEntry);
        if (myNotesEntry.getId() == null) {
            return createMyNotesEntry(myNotesEntry);
        }
        MyNotesEntry result = myNotesEntryRepository.save(myNotesEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, myNotesEntry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /my-notes-entries : get all the myNotesEntries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of myNotesEntries in body
     */
    @GetMapping("/my-notes-entries")
    @Timed
    public ResponseEntity<List<MyNotesEntry>> getAllMyNotesEntries(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of MyNotesEntries");
        Page<MyNotesEntry> page = myNotesEntryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/my-notes-entries");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /my-notes-entries/:id : get the "id" myNotesEntry.
     *
     * @param id the id of the myNotesEntry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the myNotesEntry, or with status 404 (Not Found)
     */
    @GetMapping("/my-notes-entries/{id}")
    @Timed
    public ResponseEntity<MyNotesEntry> getMyNotesEntry(@PathVariable Long id) {
        log.debug("REST request to get MyNotesEntry : {}", id);
        MyNotesEntry myNotesEntry = myNotesEntryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(myNotesEntry));
    }

    /**
     * DELETE  /my-notes-entries/:id : delete the "id" myNotesEntry.
     *
     * @param id the id of the myNotesEntry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/my-notes-entries/{id}")
    @Timed
    public ResponseEntity<Void> deleteMyNotesEntry(@PathVariable Long id) {
        log.debug("REST request to delete MyNotesEntry : {}", id);
        myNotesEntryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
