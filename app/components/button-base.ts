import { Component , View ,EventEmitter,OnInit} from 'angular2/core';
@Component({
    selector:'[button-base]',
    inputs:['isDisabled','btnValue','specailClass'],
    outputs:['Submit']
})
@View({
    template:`
        <button [class]='specailClass' [disabled]="isDisabled" (click)="onClick()" type="button">{{btnValue}}</button>
    `
})
export class ButtonBase{
    Submit:EventEmitter = new EventEmitter()
    constructor(){};
    ngOnInit(){
        console.log(this)
    }
    onClick(){
        this.Submit.emit()
    }
}