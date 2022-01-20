import { Component } from '@angular/core';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'persam-eu-sales';
  orgNr: string = "";
  period: string = "";
  name: string = "";
  phone: string = "";
  email: string = "";
  fileName: string = "csvfilnamn";
  csvCode: string = "SKV574008";
  csvColumns: string[][];
  exportColumns: string[][];

  receiveCsvImportEvent($event) {
    this.csvColumns = $event;
    // make nulllable check instead?
    document.getElementById("import-div")!.style.display = "none";
    document.getElementById("export-div")!.style.display = "block";
  }

  receiveColumnDataEvent($event) {
    this.exportColumns = $event;
    this.saveFile();
  }

  saveFile() {
    this.fileName = (<HTMLInputElement>document.getElementById('fileName')).value;
    this.orgNr = (<HTMLInputElement>document.getElementById('orgNr')).value;
    this.period = (<HTMLInputElement>document.getElementById('period')).value;
    this.name = (<HTMLInputElement>document.getElementById('name')).value;
    this.phone = (<HTMLInputElement>document.getElementById('phone')).value;
    this.email = (<HTMLInputElement>document.getElementById('email')).value;
    
    const blob = new Blob([this.createExportString(this.rearrangeCsv())],
      { type: "text/csv; charset=UTF-8" });
    saveAs(blob, `${this.fileName}.csv`);
  }

  createExportString(exportArray: string[][]) {
    let exportString: string = "";

    exportString += `${this.csvCode};;;;\n`; //several separators not needed?
    exportString += `${this.orgNr};`;
    exportString += `${this.period};`;
    exportString += `${this.name};`;
    exportString += `${this.phone};`;
    exportString += `${this.email}\n`;

    for (let i = 0; i < exportArray.length; i++) {
      for (let j = 0; j < exportArray[i].length; j++) {

        if (j == exportArray[i].length - 1) {
          exportString += exportArray[i][j]; //doesn't contain separator
        }
        else {
          exportString += `${exportArray[i][j]};`; //contains separator
        }
      }
      //exportString += "\n"; // maybe not needed, depends on importfile?
    }
    return exportString;
  }

  //same as createColumns in csv-import, create a method/class that both components can use?
  rearrangeCsv() {
    let exportArray: string[][] = new Array<Array<string>>();

    for (let i = 0; i < this.exportColumns[0].length; i++) {
      exportArray[i] = [];
    }

    for (let i = 0; i < this.exportColumns.length; i++) {
      for (let j = 0; j < this.exportColumns[i].length; j++) {
        exportArray[j].push(this.exportColumns[i][j]);
      }
    }
    return exportArray;
  }
}
