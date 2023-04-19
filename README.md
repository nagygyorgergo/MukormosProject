# MukormosProject

## README az értékelőknek:
### Pipe osztály:
-a dátum megjelentésekor használom a list-record és dashboard componensekben.

### Firestore lekérdezés:
-a dashboard listázásnál, illetve az időpont foglalás/módosítás során annak ellenőrzése, hogy az adott időpont szabad-e még (reservation.service.ts).

### Attributum direktívák:
-highlight.directive az összes record listában kiemeli a bejelentkezett felhasználóéit.
-expired.directive: dashboard oldalon (My reservations) listázáskor a lejárt időpontok háttere pirosas lesz.

### Strukturális direktívák:
Például a list-record.component.htm-ben ngIf és ngFor.

### Material elemek:
Az app.module.ts-ben láthatók a használt materialok importjai.

###
A My reservations, Profile és Add menupontok nem hasznalhatok a guest usereknek.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
