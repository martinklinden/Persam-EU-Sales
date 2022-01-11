import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReadCsvService } from '../read-csv.service';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {

  public csvColumns: string[][]; 

  @Output() messageEvent = new EventEmitter<string[][]>();

  constructor(private csvReader: ReadCsvService) {}

  ngOnInit(): void {
  }
  

  readInput($event) {
    this.csvReader.readFolder($event.target.files).subscribe((files) => {
      this.csvColumns = this.createColumns(this.parseCsv(files[0]));   
      this.messageEvent.emit(this.csvColumns); //sends the data to parent (app.component)
    });
  }

  parseCsv(csvContent: string):string[][] {
    const csvSeparator = this.findSeperator(csvContent);
    const csv: string[][] = [];
    const lines = csvContent.split("\n").filter(e => e);

    lines.forEach((element) => {
      const cols: string[] = element.split(csvSeparator);
      csv.push(cols);
    });

    return csv;
  }

  createColumns(parsedArray: string[][]): string[][]{
    let columnArray: string[][] = new Array<Array<string>>();
    
    //initialize array (there's got to be a better way...)
    for(let i = 0; i < parsedArray[0].length; i++){
        columnArray[i] = [];
    }
    
    //create columns
    for(let i = 0; i < parsedArray.length; i++){
      for(let j = 0; j < parsedArray[i].length; j++){
        columnArray[j].push(parsedArray[i][j]);
      }
    }
    return columnArray;
  }

  findSeperator(partOfArray:string):string{
    //bitwise not
    if(~partOfArray.indexOf(";")){ 
      return ";";
    }
    else{
      return ",";
    }
  }
}
