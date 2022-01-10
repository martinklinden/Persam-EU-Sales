import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CsvImportComponent } from './csv-import/csv-import.component';
import { DragableColumnsComponent } from './dragable-columns/dragable-columns.component';
import { CsvExportComponent } from './csv-export/csv-export.component';

@NgModule({
  declarations: [
    AppComponent,
    CsvImportComponent,
    DragableColumnsComponent,
    CsvExportComponent
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
