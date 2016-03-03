System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var data, headers, ListModel, SyncmailItem, List;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            data = [
                {
                    "id": "4:357838475",
                    "To": "zhailei2011@gmail.com",
                    "Cc": "",
                    "From": "zhailei2011@gmail.com",
                    "Subject": "Incident INC3065112 has been assigned to you",
                    "DateReceived": "2016-03-02T01:41:38.000Z",
                    "DisplayTo": "",
                    "Read": "0"
                },
                {
                    "id": "4:357576499",
                    "To": "\"Helpdesk China\" <Helpdesk.China@tnt.com>",
                    "Cc": "zhailei2011@gmail.com",
                    "From": "zhailei2011@gmail.com",
                    "Subject": "Re: AU QSMC 数据丢失 AU QSMC INC3065112",
                    "DateReceived": "2016-03-01T14:59:00.000Z",
                    "DisplayTo": "",
                    "Read": "1"
                },
                {
                    "id": "4:356996375",
                    "To": "\"Helpdesk China\" <Helpdesk.China@tnt.com>",
                    "Cc": "zhailei2011@gmail.com",
                    "From": "zhailei2011@gmail.com",
                    "Subject": "Re: Fw: CN 257038390 请提供下过称数据 REQ2605126",
                    "DateReceived": "2016-03-01T05:45:56.000Z",
                    "DisplayTo": "",
                    "Read": "1"
                },
                {
                    "id": "4:356313786",
                    "To": "zhailei2011@gmail.com",
                    "Cc": "zhailei2011@gmail.com",
                    "From": "zhailei2011@gmail.com",
                    "Subject": "ICS Incident Alert - Update 1 -  INC3061542 - Mobile Worker incab freezing/rebooting",
                    "DateReceived": "2016-02-29T11:03:16.000Z",
                    "DisplayTo": "",
                    "Read": "1"
                }
            ];
            headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            ListModel = (function () {
                function ListModel(http) {
                    this.http = http;
                    this.data = data;
                }
                ListModel.prototype.getList = function (options, fn) {
                    var self = this;
                    NProgress.start();
                    this.http.get('/syncmail/emails?email=' + options['email'], { headers: headers })
                        .subscribe(function (resp) {
                        var data = resp.json()['data'];
                        self.setData(data);
                        NProgress.done();
                        if (fn)
                            fn();
                    });
                };
                ListModel.prototype.sync = function (fn) {
                    var self = this;
                    NProgress.start();
                    this.http.get('/syncmail/sync', { headers: headers })
                        .subscribe(function (resp) {
                        NProgress.done();
                        var data = resp.json()['data'];
                        swal({ title: '', text: data['message'], timer: 2000, type: 'success' });
                        if (fn)
                            fn();
                    });
                };
                ListModel.prototype.setData = function (options) {
                    this.data = options;
                };
                ListModel = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ListModel);
                return ListModel;
            })();
            SyncmailItem = (function () {
                function SyncmailItem() {
                }
                SyncmailItem = __decorate([
                    core_1.Component({
                        selector: 'syncmail-item',
                        inputs: ['datas']
                    }),
                    core_1.View({
                        template: "\n        <div class=\"syncmail-item\">\n            <div class=\"syncmail-item-w\">\n                <div class=\"syncmail-item-logo\">\n                </div>\n                <div class=\"syncmail-item-c\">\n                    <div class=\"syncmail-item-t\">\n                        <div class=\"syncmail-item-read\" *ngIf=\"datas['Read'] == '1'\">\n                            <i class=\"fa fa-circle\"></i>\n                        </div>\n                        <div class=\"syncmail-item-content\">\u4E3B\u9898\uFF1A{{datas[\"Subject\"]}}</div>\n                    </div>\n                    <div class=\"syncmail-item-name ellipsis\" title=\"{{datas['From']}}\">\u53D1\u4EF6\u4EBA\uFF1A{{datas[\"From\"]}}</div>\n                    <div class=\"syncmail-item-data\">\u65E5\u671F\uFF1A{{datas[\"DateReceived\"]}}</div>\n                    <div class=\"syncmail-item-cc\" *ngIf=\"datas['Cc']\">\u6284\u9001\uFF1A{{datas[\"Cc\"]}}</div>\n                </div>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SyncmailItem);
                return SyncmailItem;
            })();
            List = (function () {
                function List(model) {
                    this.model = model;
                    this.syncBtnValue = '同步邮件';
                    this.syncBtnDis = false;
                    //this.model.getList(function(){
                    //    console.log('xxxxx');
                    //});
                }
                List.prototype.ngOnInit = function () {
                };
                List.prototype.sync = function () {
                    var self = this;
                    this.syncBtnValue = '同步中…';
                    this.syncBtnDis = true;
                    this.model.sync(function () {
                        self.syncBtnValue = '同步邮件';
                        self.syncBtnDis = false;
                    });
                };
                List.prototype.refresh = function () {
                    this.model.getList({ email: this.modelData["username"] }, function () {
                        console.log('xxxx');
                    });
                };
                List = __decorate([
                    core_1.Component({
                        selector: 'syncmail-list',
                        inputs: ['modelData'],
                        providers: [ListModel]
                    }),
                    core_1.View({
                        directives: [SyncmailItem],
                        template: "\n        <div class=\"syncmail-list\">\n            <div class=\"syncmail-list-sync\" [ngClass]=\"{disabled:syncBtnDis}\" (click)=\"sync()\" *ngIf=\"model.data\">{{syncBtnValue}}</div>\n            <div class=\"syncmail-list-w\">\n                <div class=\"syncmail-list-c\">\n                    <syncmail-item *ngFor=\"#item of model.data\" [datas]=\"item\"></syncmail-item>\n                    <div class=\"nolist\" *ngIf=\"!model.data\">\u6682\u65E0\u6570\u636E</div>\n                </div>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [ListModel])
                ], List);
                return List;
            })();
            exports_1("List", List);
        }
    }
});
//# sourceMappingURL=list.js.map