import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {

  public fileContent: string;
  public file: any;

  constructor() { 
    this.fileContent = "";
  }

  ngOnInit(): void {
  }

  fileChanged(e:any) {
    this.file = e.target.files[0];
    this.uploadDocument();
  }

  uploadDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log(fileReader.result);
      this.fileContent = fileReader.result as string
    }
    fileReader.readAsText(this.file);    
  }
}
