package com.wsib.mynotes.web.rest;

import com.wsib.mynotes.MyNotesApp;

import com.wsib.mynotes.domain.MyNotesEntry;
import com.wsib.mynotes.repository.MyNotesEntryRepository;
import com.wsib.mynotes.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.wsib.mynotes.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MyNotesEntryResource REST controller.
 *
 * @see MyNotesEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyNotesApp.class)
public class MyNotesEntryResourceIntTest {

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    @Autowired
    private MyNotesEntryRepository myNotesEntryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMyNotesEntryMockMvc;

    private MyNotesEntry myNotesEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MyNotesEntryResource myNotesEntryResource = new MyNotesEntryResource(myNotesEntryRepository);
        this.restMyNotesEntryMockMvc = MockMvcBuilders.standaloneSetup(myNotesEntryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MyNotesEntry createEntity(EntityManager em) {
        MyNotesEntry myNotesEntry = new MyNotesEntry()
            .note(DEFAULT_NOTE);
        return myNotesEntry;
    }

    @Before
    public void initTest() {
        myNotesEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createMyNotesEntry() throws Exception {
        int databaseSizeBeforeCreate = myNotesEntryRepository.findAll().size();

        // Create the MyNotesEntry
        restMyNotesEntryMockMvc.perform(post("/api/my-notes-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(myNotesEntry)))
            .andExpect(status().isCreated());

        // Validate the MyNotesEntry in the database
        List<MyNotesEntry> myNotesEntryList = myNotesEntryRepository.findAll();
        assertThat(myNotesEntryList).hasSize(databaseSizeBeforeCreate + 1);
        MyNotesEntry testMyNotesEntry = myNotesEntryList.get(myNotesEntryList.size() - 1);
        assertThat(testMyNotesEntry.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    public void createMyNotesEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = myNotesEntryRepository.findAll().size();

        // Create the MyNotesEntry with an existing ID
        myNotesEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMyNotesEntryMockMvc.perform(post("/api/my-notes-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(myNotesEntry)))
            .andExpect(status().isBadRequest());

        // Validate the MyNotesEntry in the database
        List<MyNotesEntry> myNotesEntryList = myNotesEntryRepository.findAll();
        assertThat(myNotesEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNoteIsRequired() throws Exception {
        int databaseSizeBeforeTest = myNotesEntryRepository.findAll().size();
        // set the field null
        myNotesEntry.setNote(null);

        // Create the MyNotesEntry, which fails.

        restMyNotesEntryMockMvc.perform(post("/api/my-notes-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(myNotesEntry)))
            .andExpect(status().isBadRequest());

        List<MyNotesEntry> myNotesEntryList = myNotesEntryRepository.findAll();
        assertThat(myNotesEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMyNotesEntries() throws Exception {
        // Initialize the database
        myNotesEntryRepository.saveAndFlush(myNotesEntry);

        // Get all the myNotesEntryList
        restMyNotesEntryMockMvc.perform(get("/api/my-notes-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(myNotesEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())));
    }

    @Test
    @Transactional
    public void getMyNotesEntry() throws Exception {
        // Initialize the database
        myNotesEntryRepository.saveAndFlush(myNotesEntry);

        // Get the myNotesEntry
        restMyNotesEntryMockMvc.perform(get("/api/my-notes-entries/{id}", myNotesEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(myNotesEntry.getId().intValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMyNotesEntry() throws Exception {
        // Get the myNotesEntry
        restMyNotesEntryMockMvc.perform(get("/api/my-notes-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMyNotesEntry() throws Exception {
        // Initialize the database
        myNotesEntryRepository.saveAndFlush(myNotesEntry);
        int databaseSizeBeforeUpdate = myNotesEntryRepository.findAll().size();

        // Update the myNotesEntry
        MyNotesEntry updatedMyNotesEntry = myNotesEntryRepository.findOne(myNotesEntry.getId());
        updatedMyNotesEntry
            .note(UPDATED_NOTE);

        restMyNotesEntryMockMvc.perform(put("/api/my-notes-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMyNotesEntry)))
            .andExpect(status().isOk());

        // Validate the MyNotesEntry in the database
        List<MyNotesEntry> myNotesEntryList = myNotesEntryRepository.findAll();
        assertThat(myNotesEntryList).hasSize(databaseSizeBeforeUpdate);
        MyNotesEntry testMyNotesEntry = myNotesEntryList.get(myNotesEntryList.size() - 1);
        assertThat(testMyNotesEntry.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    public void updateNonExistingMyNotesEntry() throws Exception {
        int databaseSizeBeforeUpdate = myNotesEntryRepository.findAll().size();

        // Create the MyNotesEntry

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMyNotesEntryMockMvc.perform(put("/api/my-notes-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(myNotesEntry)))
            .andExpect(status().isCreated());

        // Validate the MyNotesEntry in the database
        List<MyNotesEntry> myNotesEntryList = myNotesEntryRepository.findAll();
        assertThat(myNotesEntryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMyNotesEntry() throws Exception {
        // Initialize the database
        myNotesEntryRepository.saveAndFlush(myNotesEntry);
        int databaseSizeBeforeDelete = myNotesEntryRepository.findAll().size();

        // Get the myNotesEntry
        restMyNotesEntryMockMvc.perform(delete("/api/my-notes-entries/{id}", myNotesEntry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MyNotesEntry> myNotesEntryList = myNotesEntryRepository.findAll();
        assertThat(myNotesEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MyNotesEntry.class);
        MyNotesEntry myNotesEntry1 = new MyNotesEntry();
        myNotesEntry1.setId(1L);
        MyNotesEntry myNotesEntry2 = new MyNotesEntry();
        myNotesEntry2.setId(myNotesEntry1.getId());
        assertThat(myNotesEntry1).isEqualTo(myNotesEntry2);
        myNotesEntry2.setId(2L);
        assertThat(myNotesEntry1).isNotEqualTo(myNotesEntry2);
        myNotesEntry1.setId(null);
        assertThat(myNotesEntry1).isNotEqualTo(myNotesEntry2);
    }
}
