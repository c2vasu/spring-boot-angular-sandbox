package com.wsib.mynotes.cucumber.stepdefs;

import com.wsib.mynotes.MyNotesApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = MyNotesApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
