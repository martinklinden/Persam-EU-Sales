import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { toArray } from 'rxjs';


@Component({
  selector: 'app-dragable-columns',
  templateUrl: './dragable-columns.component.html',
  styleUrls: ['./dragable-columns.component.css']
})
export class DragableColumnsComponent implements OnInit {

  @Input() sourceArray: string[][];
  @Output() messageEvent = new EventEmitter<string[][]>();

  constructor() { }

  ngOnInit(): void {
  }

  VATNRArray: string[][] = new Array<Array<string>>();
  triangularTradeArray: string[][] = new Array<Array<string>>();
  servicesArray: string[][] = new Array<Array<string>>();
  godsArray: string[][] = new Array<Array<string>>();

  collectedData: string[][] = new Array<Array<string>>();

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    //is there a better way to send the data? 
    this.collectData();
  }

  //this will happen repeatedly while hovering with an object, is there a better way?
  canDrop(item: CdkDrag, list: CdkDropList) {
    //console.log(list.getSortedItems.length);
    return !(list.getSortedItems().length > 0);
  }

  //test , remove later
  alertClick(bool: boolean){
    if(bool){
      alert(this.VATNRArray);
    }
    else{
      alert(this.sourceArray);
    }
  }

  collectData(){
    this.collectedData = []; // clear
   
    this.collectedData.push(this.VATNRArray[0]);
    this.collectedData.push(this.triangularTradeArray[0]);
    this.collectedData.push(this.servicesArray[0]);
    this.collectedData.push(this.godsArray[0]);
   
    this.messageEvent.emit(this.collectedData);
  }
}
