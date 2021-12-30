import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {

  public csvContent: string;
  public parsedCsv: string[][];

  constructor() { 
  }

  ngOnInit(): void {
  }

  onFileLoad(fileLoadedEvent: any): void {
    const csvSeparator = ';';
    const textFromFileLoaded: string = fileLoadedEvent.target.result;              
    this.csvContent = textFromFileLoaded;     
    
    // parsing the csv
    const txt = textFromFileLoaded;
    const csv:any = [];
    const lines = txt.split('\n');
    lines.forEach(element => {
      const cols: string[] = element.split(csvSeparator);
      csv.push(cols);
      });
    this.parsedCsv = csv;
    
    // // test
    // console.log(this.parsedCsv);
    // console.log(this.parsedCsv[0]);
    // console.log(this.parsedCsv[0][0]);
    // alert(this.parsedCsv[0][0]);
    
    // // demo output as alert
    // var output: string="";
    // csv.forEach(row => {
    //   output += "\n";
    //   var colNo = 0;
    //   row.forEach(col => {
    //     if (colNo>0) output += " | ";
    //     output += col;
    //     colNo++;
    //   });
    // });
    // alert(output);
  }

  onFileSelect(input: any) {

    const files = input.files;
    // var content = this.csvContent; ???
    
    if (files && files.length) {
       
        // console.log("Filename: " + files[0].name);
        // console.log("Type: " + files[0].type);
        // console.log("Size: " + files[0].size + " bytes");        

      const fileToRead = files[0];
      const fileReader = new FileReader();

      fileReader.onload = this.onFileLoad; 
      fileReader.readAsText(fileToRead, "UTF-8");
    }
  }
}
