import { Component , View ,OnInit,OnChanges} from 'angular2/core';
@Component({
    selector:'input-base',
    inputs:['placeholder','key','models','type']
})
@View({
    template:`
        <input  class="form-control" [type]="type" [placeholder]="placeholder" [(ngModel)]="models[key]"  #input required/>
    `
})
export class InputBase{
    constructor(){
    };
    ngOnInit(){
    }
}