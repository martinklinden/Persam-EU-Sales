import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dragable-columns',
  templateUrl: './dragable-columns.component.html',
  styleUrls: ['./dragable-columns.component.css']
})
export class DragableColumnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  VATNRArray: string[] = new Array<string>();
  triangularTradeArray: string[] = new Array<string>();
  servicesArray: string[] = new Array<string>();
  godsArray: string[] = new Array<string>();

  // sourceArray = ['vat', 'tritrade', 'gods', 'services', 'email'];
  sourceArray = [['1', '1', ''],['2', '', '2'],['', '3', '3'],['4', '4', '4'],['', '5', '']];
  collectedData: string[][] = new Array<Array<string>>();

  // drop(event: CdkDragDrop<string[]>) {
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
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
    console.log(list.getSortedItems.length);
    return !(list.getSortedItems().length > 0);
  }

  //test , remove later
  alertClick(bool: boolean){
    if(bool){
      alert(this.VATNRArray);
    }
    else{
      alert(this.sourceArray
    );
    }
  }

  //test , remove later
  collectData(){
    this.collectedData.push(this.VATNRArray);
    this.collectedData.push(this.triangularTradeArray);
    this.collectedData.push(this.servicesArray);
    this.collectedData.push(this.godsArray);
  }
}
