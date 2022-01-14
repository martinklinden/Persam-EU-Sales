import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


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
  }
  //this will happen repeatedly while hovering with an object, is there a better way?
  canDrop(item: CdkDrag, list: CdkDropList) {
    //console.log(list.getSortedItems.length);
    return !(list.getSortedItems().length > 0);
  }

  collectData(){
    this.collectedData = []; // clear
    let arrayIdexes:number[] = new Array<number>();

    let inputElements = document.getElementsByClassName('checkbox-input');
    let arrayInputElements:any = [].slice.call(inputElements);
    
    for(let i = 0; i < arrayInputElements.length; ++i){
      if(!arrayInputElements[i].checked){
        arrayIdexes.push(i);
      }
    }

    //reverse for-loop to not disturb order of array while removing elements
    for(let i = arrayIdexes.length - 1; i >= 0; i--){
      this.VATNRArray[0].splice(arrayIdexes[i], 1);
      this.triangularTradeArray[0].splice(arrayIdexes[i], 1);
      this.servicesArray[0].splice(arrayIdexes[i], 1);
      this.godsArray[0].splice(arrayIdexes[i], 1);
    }

    this.collectedData.push(this.VATNRArray[0]);
    this.collectedData.push(this.triangularTradeArray[0]);
    this.collectedData.push(this.servicesArray[0]);
    this.collectedData.push(this.godsArray[0]);

    this.messageEvent.emit(this.collectedData);
  }
}
