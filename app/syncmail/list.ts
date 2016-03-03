import { Component , View , Injectable ,OnInit} from 'angular2/core';
import { HTTP_PROVIDERS,Http, Headers,Response} from 'angular2/http';

var data = [{"id":"4:357838475","To":"kevin.wu@tnt.com","Cc":"","From":"\"TNT Global IT Service Operations\" <tnt@service-now.com>","Subject":"Incident INC3065112 has been assigned to you","DateReceived":"2016-03-02T01:41:38.000Z","DisplayTo":"","Read":"0"},{"id":"4:357576499","To":"\"Helpdesk China\" <Helpdesk.China@tnt.com>","Cc":"\"Jimmy Shen\" <jimmy.shen@tnt.com>, \"Kevin Wu\" <kevin.wu@tnt.com>, \"pvg_project\" <pvg_project@tnt.com>","From":"\"Army Sun\" <army.sun@tnt.com>","Subject":"Re: AU QSMC \u6570\u636e\u4e22\u5931 AU QSMC INC3065112","DateReceived":"2016-03-01T14:59:00.000Z","DisplayTo":"","Read":"1"},{"id":"4:356996375","To":"\"Helpdesk China\" <Helpdesk.China@tnt.com>","Cc":"\"Kevin Wu\" <kevin.wu@tnt.com>","From":"\"Amber Qian\" <amber.qian@tnt.com>","Subject":"Re: Fw: CN 257038390 \u8bf7\u63d0\u4f9b\u4e0b\u8fc7\u79f0\u6570\u636e REQ2605126","DateReceived":"2016-03-01T05:45:56.000Z","DisplayTo":"","Read":"1"},{"id":"4:356313786","To":null,"Cc":"","From":"\"Incident Management\" <SW5jaWRlbnQgTWFuYWdlbWVudA==@lnt.noninternet.sub>","Subject":"ICS Incident Alert - Update 1 -  INC3061542 - Mobile Worker incab freezing\/rebooting","DateReceived":"2016-02-29T11:03:16.000Z","DisplayTo":"","Read":"1"}];
const headers = new Headers({'Content-Type': 'application/json'});
@Injectable()
class ListModel{
    data:Array;
    constructor(private http: Http){}
    private getList(options,fn){
        let self = this;
        NProgress.start();
        this.http.get('/syncmail/emails?email='+options['email'], { headers: headers })
            .subscribe((resp:Response)=>{
                var data = resp.json()['data'];
                self.setData(data)
                NProgress.done();
                if(fn) fn()
            })
    }
    private sync(fn){
        let self = this;
        NProgress.start();
        this.http.get('/syncmail/sync', { headers: headers })
            .subscribe((resp:Response)=>{
                NProgress.done();
                var data = resp.json()['data'];
                swal({  title:'', text: data['message'],timer: 2000,type:'success'});
                if(fn) fn()
            })
    }
    private setData(options){
        this.data = options;
    }
}

@Component({
    selector:'syncmail-item',
    inputs:['datas']
})
@View({
    template:`
        <div class="syncmail-item">
            <div class="syncmail-item-w">
                <div class="syncmail-item-logo">
                </div>
                <div class="syncmail-item-c">
                    <div class="syncmail-item-t">
                        <div class="syncmail-item-read" *ngIf="datas['Read'] == '1'">
                            <i class="fa fa-circle"></i>
                        </div>
                        <div class="syncmail-item-content">主题：{{datas["Subject"]}}</div>
                    </div>
                    <div class="syncmail-item-name ellipsis" title="{{datas['From']}}">发件人：{{datas["From"]}}</div>
                    <div class="syncmail-item-data">日期：{{datas["DateReceived"]}}</div>
                    <div class="syncmail-item-cc" *ngIf="datas['Cc']">抄送：{{datas["Cc"]}}</div>
                </div>
            </div>
        </div>
    `
})
class SyncmailItem{}
@Component({
    selector:'syncmail-list',
    inputs:['modelData'],
    providers: [ListModel]
})
@View({
    directives:[SyncmailItem],
    template:`
        <div class="syncmail-list">
            <div class="syncmail-list-sync" [ngClass]="{disabled:syncBtnDis}" (click)="sync()" *ngIf="model.data">{{syncBtnValue}}</div>
            <div class="syncmail-list-w">
                <div class="syncmail-list-c">
                    <syncmail-item *ngFor="#item of model.data" [datas]="item"></syncmail-item>
                    <div class="nolist" *ngIf="!model.data">暂无数据</div>
                </div>
            </div>
        </div>
    `
})
export class List{
    syncBtnValue:string ='同步邮件';
    syncBtnDis:Boolean = false;
    constructor(private model:ListModel){
        //this.model.getList(function(){
        //    console.log('xxxxx');
        //});
    }
    ngOnInit(){

    }
    private sync(){
        let self = this;
        this.syncBtnValue = '同步中…';
        this.syncBtnDis = true
        this.model.sync(function(){
            self.syncBtnValue = '同步邮件';
            self.syncBtnDis = false;
        })
    }
    public refresh(){
        this.model.getList({email:this.modelData["username"]},function(){
            console.log('xxxx');
        })
    }
}

