System.register(['angular2/core', './../components/base-input', './../components/button-base'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, base_input_1, button_base_1;
    var Model, SettingForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (base_input_1_1) {
                base_input_1 = base_input_1_1;
            },
            function (button_base_1_1) {
                button_base_1 = button_base_1_1;
            }],
        execute: function() {
            Model = (function () {
                function Model() {
                }
                return Model;
            })();
            SettingForm = (function () {
                function SettingForm() {
                    this.cancelSetting = new core_1.EventEmitter();
                    this.settingSuccess = new core_1.EventEmitter();
                    this.submitBtnValue = '提交';
                    this.submitBtnDis = false;
                    this.cancelBtnValue = '取消';
                }
                SettingForm.prototype.ngOnInit = function () {
                    var self = this;
                    this.model = new Model();
                    this.model['username'] = this.modelData["username"];
                    this.model['password'] = this.modelData['password'];
                    this.model['endpoint'] = this.modelData['endpoint'];
                };
                ;
                SettingForm.prototype.ngOnChanges = function () {
                };
                SettingForm.prototype.onSubmit = function () {
                    var self = this;
                    this.submitBtnValue = '提交中…';
                    this.submitBtnDis = true;
                    var data = {
                        username: this.model.username,
                        password: this.model.password,
                        endpoint: this.model.endpoint
                    };
                    this.modelData.setUser(data, function () {
                        console.log('设置成功了,然后呢');
                        self.settingSuccess.emit();
                    });
                };
                SettingForm.prototype.onCancel = function () {
                    this.cancelSetting.emit();
                };
                SettingForm = __decorate([
                    core_1.Component({
                        selector: 'setting-form',
                        inputs: ['modelData'],
                        outputs: ['cancelSetting', 'settingSuccess']
                    }),
                    core_1.View({
                        directives: [base_input_1.InputBase, button_base_1.ButtonBase],
                        template: "\n        <div class=\"setting-form\">\n            <div class=\"form-item\">\n                <div class=\"form-item-w\">\n                    <label for=\"\">\u7528\u6237\u540D</label>\n                    <div class=\"form-item-c\">\n                        <input-base [models]=\"model\" [key]=\"'username'\" [placeholder]=\"'\u8BF7\u8F93\u5165\u7528\u6237\u540D'\"></input-base>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-item\">\n                <div class=\"form-item-w\">\n                    <label for=\"\">\u5BC6\u7801</label>\n                    <div class=\"form-item-c\">\n                        <input-base [type]=\"'password'\" [models]=\"model\" [key]=\"'password'\" [placeholder]=\"'\u8BF7\u8F93\u51FA\u5BC6\u7801'\"></input-base>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-item\">\n                <div class=\"form-item-w\">\n                    <label for=\"\">\u94FE\u63A5</label>\n                    <div class=\"form-item-c\">\n                        <input-base [models]=\"model\" [key]=\"'endpoint'\" [placeholder]=\"'\u8BF7\u8F93\u5165\u5185\u5BB9'\"></input-base>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-item\">\n                <div class=\"button-base\" button-base [btnValue]=\"submitBtnValue\" (Submit)=\"onSubmit($event)\" [isDisabled]=\"submitBtnDis\" [specailClass]=\"'submit'\"></div>\n                <div class=\"button-base\" button-base [btnValue]=\"cancelBtnValue\" (Submit)=\"onCancel($event)\" [specailClass]=\"'cancel'\"></div>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SettingForm);
                return SettingForm;
            })();
            exports_1("SettingForm", SettingForm);
        }
    }
});
//# sourceMappingURL=setting-form.js.map