import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadCsvService {

  constructor() { }

  private fileCache: string[]; // remove/change later
  private csvReader$: Subject<string[]> = new Subject();
  
  //made for reading folder, make changes when everything works
  public readFolder(files: string[]) {
    this.fileCache = []; 
    this.readFile(0, files);
    return this.csvReader$.asObservable(); // Doesn't return the subject itself, but a "readonly" Observable.
  }

  //recursive method, doesn't need to be
  private readFile(index, files) {
    const reader = new FileReader();
    if (index >= files.length) {
      this.csvReader$.next(this.fileCache);
      return;
    }
    const file = files[index];
    reader.onload = (e: any) => {
      this.fileCache.push(e.target.result);
      this.readFile(index + 1, files);
    };
    reader.readAsText(file, 'UTF-8');
  }
}
