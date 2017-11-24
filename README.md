# MyNotes
My Notes is a full stack web application. To create a simple My Notes web application which satisfies following requirements.

## Business requirements:

1. As a user I need a single page web application which must have an input field to capture and save my text notes.
2. My notes must be persisted by the application so that the next time when I visit the application page, I must be able to see all my previously saved notes.
3. As a user, I would like to edit my notes or delete it at any time .


## Technical requirements:

1. Build the app frontend UI on Angular framework
2. Use Springboot as your backend application framework and database of your choice for data persistence.
3. Create Restful API’s
4. Use gradle (preferable) or Maven as a build automation tool
5. Use Heroku platform to build your modern web application
6. Use GitHub as your code repository

## Technology stack on the client side

1. Angular 4
2. Responsive Web Design with Twitter Bootstrap
3. HTML5 Boilerplate
4. Sass
5. Bower
6. Webpack

## Technology stack on the server side

1. Spring Boot 1.5.7.RELEASE
2. Gradle configuration for building, testing and running the application
3. Spring Security
4. Spring MVC REST + Jackson
5. Spring Data JPA + Bean Validation
6. H2

## Technology stack on Testing

1. Karma
2. Protractor
3. Cucumber
4. Newman
5. Postman
6. Swagger

## Technology stack on Software Engineering

1. Docker
2. Heroku
3. Vagrant
4. Jenkins


## Continuous Integration

To setup this project in Jenkins, use the following configuration:

* Project name: `MyNotes`
* Source Code Management
    * Git Repository: `git@github.com:c2vasu/spring-boot-angular-sandbox.git`
    * Branches to build: `*/master`
    * Additional Behaviours: `Wipe out repository & force clone`
* Build Triggers
    * Poll SCM / Schedule: `H/5 * * * *`
* Build
    * Invoke Gradle script / Use Gradle Wrapper / Tasks: `-Pprod clean test bootRepackage`
* Post-build Actions
    * Publish JUnit test result report / Test Report XMLs: `build/test-results/*.xml`

[Gatling]: http://gatling.io/
[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/
