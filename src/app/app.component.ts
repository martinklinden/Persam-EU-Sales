import { Component } from '@angular/core';
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'persam-eu-sales';
  fileName: string = "TEMP";
  csvColumns: string[][];
  exportColumns: string[][];

  receiveCsvImportEvent($event){
    this.csvColumns = $event;
    //make nulllable check instead?
    // document.getElementById("import")!.style.display = "none"; // hide import html
    // document.getElementById("columns")!.style.display = "block";
  }

  receiveColumnDataEvent($event){
    this.exportColumns = $event;
  }
  
  saveFile(){
    this.fileName = (<HTMLInputElement>document.getElementById('fileName')).value;
    const blob = new Blob([this.createExportString(this.rearrangeCsv())], 
    {type: "text/csv; charset=utf-8"});
    saveAs(blob, `${ this.fileName }.csv`);
  }
  
  createExportString(exportArray: string[][]){
    let exportString:string = "";
    for(let i = 0; i<exportArray.length;i++){
      for(let j = 0; j<exportArray[i].length;j++){
        exportString += `${ exportArray[i][j] };`; //contains separator
      }
      // exportString += "\n"; // maybe not needed
    }
    return exportString;
  }

  //same as createColumns in csv-import, create a method/class that both components can use??
  rearrangeCsv(){
    let exportArray: string[][] = new Array<Array<string>>();

    for(let i = 0; i < this.exportColumns[0].length; i++){
      exportArray[i] = [];
    }

    for(let i = 0; i < this.exportColumns.length; i++){
      for(let j = 0; j < this.exportColumns[i].length; j++){
        exportArray[j].push(this.exportColumns[i][j]);
      }
    }
    return exportArray;
  }
}
