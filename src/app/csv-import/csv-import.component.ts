import { Component, OnInit } from '@angular/core';
import { ReadCsvService } from '../read-csv.service';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {

  csvHTMLDuplicate = "Duplicate";
  stringAlert = "";
  public csvContent: string;
  public parsedCsv: string[][];

  constructor(private csvReader: ReadCsvService) {}

  ngOnInit(): void {
  }
  
  //testing functionality
  testClick() {
    //FIX: substitute ! for a null check instead
    document.getElementById("p2")!.innerHTML = document.getElementById(
      "p1"
    )!.innerHTML;
    
    //saves html value in variable
    this.stringAlert = document.getElementById("p1")!.innerHTML;
  }

  //testing functionality
  testClick2() {
    alert(this.stringAlert);
  }

  readInput($event) {
    this.csvReader.readFolder($event.target.files).subscribe((files) => {
      console.log("The content of the files:", files);
      this.csvContent = files[0];
      this.parsedCsv = this.parseCsv(files[0]);

      //parsedCsv[][]
      //first[] is row, 
      //second[] is placement in row

      // for(let i = 0; i < this.parsedCsv.length; i++){
      //   for(let j = 0; j < this.parsedCsv[i].length; j++){
      //     console.log(this.parsedCsv[i][j]);
      //   }
      // }
    });
  }

  parseCsv(csvContent: string):any {
    const csvSeparator = ";";
    
    const csv: any = [];
    const lines = csvContent.split("\n");
    lines.forEach((element) => {
      const cols: string[] = element.split(csvSeparator);
      csv.push(cols);
    });
    return csv;
  }
}
