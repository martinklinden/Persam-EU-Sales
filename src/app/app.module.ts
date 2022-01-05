import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CsvImportComponent } from './csv-import/csv-import.component';
import { DragableColumnsComponent } from './dragable-columns/dragable-columns.component';

@NgModule({
  declarations: [
    AppComponent,
    CsvImportComponent,
    DragableColumnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
