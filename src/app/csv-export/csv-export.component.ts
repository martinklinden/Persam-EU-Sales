import { Component, OnInit } from '@angular/core';
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-csv-export',
  templateUrl: './csv-export.component.html',
  styleUrls: ['./csv-export.component.css']
})
export class CsvExportComponent implements OnInit {

  public fileName: string;
  public exportArray: string[][] = [["1", "1", "1"],["2", "2", "2"],["3","3", "3"],["4","4","4"]];

  constructor() { }

  ngOnInit(): void {
    this.fileName = "temp";
  }

  saveFile(){
    this.fileName = (<HTMLInputElement>document.getElementById('fileName')).value;

    const blob = new Blob([this.createExportString()], 
    {type: "text/csv; charset=utf-8"});
    saveAs(blob, `${ this.fileName }.csv`);
  }
  
  createExportString(){
    let exportString:string = "";

    for(let i = 0; i<this.exportArray.length;i++){
      for(let j = 0; j<this.exportArray[j].length;j++){
        exportString += `${ this.exportArray[i][j] };`; //contains separator
      }
      exportString += "\n"; // maybe not needed
    }
    return exportString;
  }
}
