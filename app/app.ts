import { ViewChild,Component , View ,Injectable,OnInit,Directive} from 'angular2/core';
import { HTTP_PROVIDERS,Http, Headers,Response} from 'angular2/http';

import { SettingForm } from './syncmail/setting-form'
import { List } from './syncmail/list'

const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
class SettingModel{
    private username:string = 'kevin.wu@tnt.com';
    private password:string = '123456';
    private endpoint:string = 'https://Access1.tnt.com/traveler/Microsoft-Server-ActiveSync';
    constructor(private http: Http){}
    private getData(){
        let self = this;
        this.http.get('/syncmail/config?email=zhailei@dogesoft.cn', { headers: headers })
            .subscribe((resp:Response)=>{
                var data = resp.json()['data'];
                self.setData(data)
            })
    }
    private setData(options){
        _.extend(this,options);
    }
    private setUser(data,fn){
        let self = this;
        this.http.post('/syncmail/config',JSON.stringify(data),{ headers: headers })
            .subscribe((resp:Response)=>{
                var data = resp.json()['data'];
                self.setData(data);
                if(fn) fn()
            })
    }
}

@Component({
    selector: 'my-app',
    providers: [HTTP_PROVIDERS, SettingModel],
})
@View({
    directives:[SettingForm,List],
    template: `
        <div class="my-app">
            <h1>邮件同步</h1>
            <div class="syncmail-setting">
                <setting-form [modelData]="model" *ngIf="showSetting" (cancelSetting) ='cancelSetting($event)' (settingSuccess) = 'settingSuccess($event)'></setting-form>
            </div>
            <div class="syncmail-info" *ngIf="!showSetting">
                <div class="syncmail-info-item">
                    <label for="">用户名：</label>
                    <div class="syncmail-info-val ellipsis">{{model["username"]}}</div>
                </div>
                <div class="syncmail-info-item">
                    <label for="">端点：</label>
                    <div class="syncmail-info-val ellipsis">{{model["endpoint"]}}</div>
                </div>
                <div class="syncmail-info-item" style="text-align: right;margin-top:10px;">
                    <button type="button" (click)="setInfo()">编辑</button>
                </div>
            </div>
            <div class="syncmail-list">
                <syncmail-list [modelData]="model" ></syncmail-list>
            </div>
        </div>
	`
})
export class MyApp{
    @ViewChild(List) child:List;
    isHide:Boolean = true;
    showSetting:Boolean = false;
    constructor(private model:SettingModel){
        let self = this;
        console.log(this.model);
        NProgress.configure({ showSpinner: false });
    }
    cancelSetting(){
        this.showSetting = false
    }
    settingSuccess(evnet){
        this.showSetting = false;
        this.child.refresh()
    }
    setInfo(){
        this.showSetting = true
    };
    ngAfterViewInit(){
        //NProgress.start()
        this.child.refresh();
    }
}