import { Component, OnInit } from '@angular/core';
import { ReadCsvService } from '../read-csv.service';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {

  csvHTMLDuplicate = "Duplicate"; //remove later
  stringAlert = "Empty"; //remove later
  public csvContent: string; //is this needed?
  public csvParsed: string[][]; //is this needed?
  public csvColumns: string[][]; 

  constructor(private csvReader: ReadCsvService) {}

  ngOnInit(): void {
  }
  
  //testing functionality, remove later
  testClick() {
    //FIX: substitute ! for a null check instead
    document.getElementById("test2")!.innerHTML = document.getElementById(
      "test1"
    )!.innerHTML;
    
    //saves html value in variable
    this.stringAlert = document.getElementById("test1")!.innerHTML;
  }

  //testing functionality, remove later
  testClick2() {
    alert(this.stringAlert);
  }

  readInput($event) {
    this.csvReader.readFolder($event.target.files).subscribe((files) => {
      this.csvContent = files[0]; //is this needed?
      this.csvParsed = this.parseCsv(files[0]);
      //csvParsed[][]
      //first[] is row, 
      //second[] is placement in row
      this.csvColumns = this.createColumns(this.csvParsed);
      
    });
  }

  parseCsv(csvContent: string):string[][] {
    const csvSeparator = this.findSeperator(csvContent);
    const csv: string[][] = [];

    const lines = csvContent.split("\n");

    lines.forEach((element) => {
      const cols: string[] = element.split(csvSeparator);
      csv.push(cols);
    });
    return csv;
  }

  createColumns(parsedArray: string[][]): string[][]{
    let columnArray: string[][] = new Array<Array<string>>();
    // //initialize array (there's got to be a better way...)
    // //maybe create an temp array with the correct length, give it the correct data, then -> this.csvColumns = columnArray
    for(let i = 0; i < parsedArray.length; i++){
      if(i < parsedArray[i].length){
        columnArray[i] = [];
      }
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
