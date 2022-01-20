import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


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
    return !(list.getSortedItems().length > 0);
  }

  collectData() {
    this.collectedData = []; // clear
    let arrayIdexes: number[] = new Array<number>();
    let tempArray: string[][] = new Array<Array<string>>(4);;

    let inputElements = document.getElementsByClassName('checkbox-input');
    let arrayInputElements: any = [].slice.call(inputElements);

    for (let i = 0; i < arrayInputElements.length; ++i) {
      if (!arrayInputElements[i].checked) {
        arrayIdexes.push(i);
      }
    }

    tempArray[0] = this.VATNRArray[0].slice(0);
    tempArray[1] = this.triangularTradeArray[0].slice(0);
    tempArray[2] = this.servicesArray[0].slice(0);
    tempArray[3] = this.godsArray[0].slice(0);

    // removes the checked in rows
    // reverse for-loop to not disturb order of array while removing elements
    for (let i = arrayIdexes.length - 1; i >= 0; i--) {
      for (let j = 0; j < tempArray.length; j++) {
        tempArray[j].splice(arrayIdexes[i], 1);
      }
    }

    for (let i = 0; i < tempArray.length; i++) {
      this.collectedData.push(tempArray[i]);
    }

    this.messageEvent.emit(this.collectedData);
  }
}
