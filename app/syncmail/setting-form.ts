import { Component , View ,EventEmitter,OnInit,OnDestroy,DoCheck,OnChanges,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked} from 'angular2/core';
import { InputBase } from './../components/base-input';
import { ButtonBase } from './../components/button-base';
class Model{}
@Component({
    selector:'setting-form',
    inputs:['modelData'],
    outputs:['cancelSetting','settingSuccess']
})
@View({
    directives:[InputBase,ButtonBase],
    template:`
        <div class="setting-form">
            <div class="form-item">
                <div class="form-item-w">
                    <label for="">用户名</label>
                    <div class="form-item-c">
                        <input-base [models]="model" [key]="'username'" [placeholder]="'请输入用户名'"></input-base>
                    </div>
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-w">
                    <label for="">密码</label>
                    <div class="form-item-c">
                        <input-base [type]="'password'" [models]="model" [key]="'password'" [placeholder]="'请输出密码'"></input-base>
                    </div>
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-w">
                    <label for="">链接</label>
                    <div class="form-item-c">
                        <input-base [models]="model" [key]="'endpoint'" [placeholder]="'请输入内容'"></input-base>
                    </div>
                </div>
            </div>
            <div class="form-item">
                <div class="button-base" button-base [btnValue]="submitBtnValue" (Submit)="onSubmit($event)" [isDisabled]="submitBtnDis" [specailClass]="'submit'"></div>
                <div class="button-base" button-base [btnValue]="cancelBtnValue" (Submit)="onCancel($event)" [specailClass]="'cancel'"></div>
            </div>
        </div>
    `
})
export class SettingForm{
    cancelSetting:EventEmitter = new EventEmitter();
    settingSuccess:EventEmitter = new EventEmitter();
    submitBtnValue:string = '提交';
    submitBtnDis:string = false;
    cancelBtnValue:string = '取消';
    constructor(){}
    ngOnInit(){
        let self = this;
        this.model = new Model();
        this.model['username'] = this.modelData["username"];
        this.model['password'] = this.modelData['password'];
        this.model['endpoint'] = this.modelData['endpoint'];
    };
    ngOnChanges(){
    }
    onSubmit(){
        let self = this;
        this.submitBtnValue = '提交中…';
        this.submitBtnDis = true;
        var data = {
            username:this.model.username,
            password:this.model.password,
            endpoint:this.model.endpoint
        }
        this.modelData.setUser(data,function(){
            console.log('设置成功了,然后呢')
            self.settingSuccess.emit()
        });
    }
    onCancel(){
        this.cancelSetting.emit()
    }
}