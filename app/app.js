System.register(['angular2/core', 'angular2/http', './syncmail/setting-form', './syncmail/list'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, setting_form_1, list_1;
    var headers, SettingModel, MyApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (setting_form_1_1) {
                setting_form_1 = setting_form_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            }],
        execute: function() {
            headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            SettingModel = (function () {
                function SettingModel(http) {
                    this.http = http;
                    this.username = 'kevin.wu@tnt.com';
                    this.password = '123456';
                    this.endpoint = 'https://Access1.tnt.com/traveler/Microsoft-Server-ActiveSync';
                }
                SettingModel.prototype.getData = function () {
                    var self = this;
                    this.http.get('/syncmail/config?email=zhailei@dogesoft.cn', { headers: headers })
                        .subscribe(function (resp) {
                        var data = resp.json()['data'];
                        self.setData(data);
                    });
                };
                SettingModel.prototype.setData = function (options) {
                    _.extend(this, options);
                };
                SettingModel.prototype.setUser = function (data, fn) {
                    var self = this;
                    this.http.post('/syncmail/config', JSON.stringify(data), { headers: headers })
                        .subscribe(function (resp) {
                        var data = resp.json()['data'];
                        self.setData(data);
                        if (fn)
                            fn();
                    });
                };
                SettingModel = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SettingModel);
                return SettingModel;
            })();
            MyApp = (function () {
                function MyApp(model) {
                    this.model = model;
                    this.isHide = true;
                    this.showSetting = false;
                    var self = this;
                    console.log(this.model);
                    NProgress.configure({ showSpinner: false });
                }
                MyApp.prototype.cancelSetting = function () {
                    this.showSetting = false;
                };
                MyApp.prototype.settingSuccess = function (evnet) {
                    this.showSetting = false;
                    this.child.refresh();
                };
                MyApp.prototype.setInfo = function () {
                    this.showSetting = true;
                };
                ;
                MyApp.prototype.ngAfterViewInit = function () {
                    //NProgress.start()
                    this.child.refresh();
                };
                __decorate([
                    core_1.ViewChild(list_1.List), 
                    __metadata('design:type', list_1.List)
                ], MyApp.prototype, "child", void 0);
                MyApp = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        providers: [http_1.HTTP_PROVIDERS, SettingModel],
                    }),
                    core_1.View({
                        directives: [setting_form_1.SettingForm, list_1.List],
                        template: "\n        <div class=\"my-app\">\n            <h1>\u90AE\u4EF6\u540C\u6B65</h1>\n            <div class=\"syncmail-setting\">\n                <setting-form [modelData]=\"model\" *ngIf=\"showSetting\" (cancelSetting) ='cancelSetting($event)' (settingSuccess) = 'settingSuccess($event)'></setting-form>\n            </div>\n            <div class=\"syncmail-info\" *ngIf=\"!showSetting\">\n                <div class=\"syncmail-info-item\">\n                    <label for=\"\">\u7528\u6237\u540D\uFF1A</label>\n                    <div class=\"syncmail-info-val ellipsis\">{{model[\"username\"]}}</div>\n                </div>\n                <div class=\"syncmail-info-item\">\n                    <label for=\"\">\u7AEF\u70B9\uFF1A</label>\n                    <div class=\"syncmail-info-val ellipsis\">{{model[\"endpoint\"]}}</div>\n                </div>\n                <div class=\"syncmail-info-item\" style=\"text-align: right;margin-top:10px;\">\n                    <button type=\"button\" (click)=\"setInfo()\">\u7F16\u8F91</button>\n                </div>\n            </div>\n            <div class=\"syncmail-list\">\n                <syncmail-list [modelData]=\"model\" ></syncmail-list>\n            </div>\n        </div>\n\t"
                    }), 
                    __metadata('design:paramtypes', [SettingModel])
                ], MyApp);
                return MyApp;
            })();
            exports_1("MyApp", MyApp);
        }
    }
});
//# sourceMappingURL=app.js.map