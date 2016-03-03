System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ButtonBase;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ButtonBase = (function () {
                function ButtonBase() {
                    this.Submit = new core_1.EventEmitter();
                }
                ;
                ButtonBase.prototype.ngOnInit = function () {
                    console.log(this);
                };
                ButtonBase.prototype.onClick = function () {
                    this.Submit.emit();
                };
                ButtonBase = __decorate([
                    core_1.Component({
                        selector: '[button-base]',
                        inputs: ['isDisabled', 'btnValue', 'specailClass'],
                        outputs: ['Submit']
                    }),
                    core_1.View({
                        template: "\n        <button [class]='specailClass' [disabled]=\"isDisabled\" (click)=\"onClick()\" type=\"button\">{{btnValue}}</button>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ButtonBase);
                return ButtonBase;
            })();
            exports_1("ButtonBase", ButtonBase);
        }
    }
});
//# sourceMappingURL=button-base.js.map