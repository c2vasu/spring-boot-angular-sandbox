package com.wsib.mynotes.repository;

import com.wsib.mynotes.domain.MyNotesEntry;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MyNotesEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MyNotesEntryRepository extends JpaRepository<MyNotesEntry, Long> {

}
