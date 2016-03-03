/**
 * 提供一个Service 用来打开dialog
 */
@Injectable()
export class MdDialog {
    /**
     * 对于Angular 2来说，开启一个dialog其实也就是打开一个Component
     * type => 你要打开的组件类
     * elementRef => 使用该服务时那个组件的  elementRef
     * options => 一些dialog的配置 这里只有width和height
     */
    open(type: Type, elementRef: ElementRef, options: MdDialogConfig = null): Promise<MdDialogRef> {
        // 判断有没config ,没有的话创建一个
        var config = isPresent(options) ? options : new MdDialogConfig();
        // 创建一个dialogRef对象，这个对象里保存dialog中用到的各种对象引用
        var dialogRef = new MdDialogRef();
        // 创建一个Injector,为了让被打开的组件能使用依赖注入访问到dialogRef
        var bindings = Injector.resolve([provide(MdDialogRef, {useValue: dialogRef})]);
        // 打开一个dialog背景，打开是异步的所以返回一个promise
        // 这里代码和下面差不多，具体怎么打开就详写了
        var backdropRefPromise = this._openBackdrop(elementRef, bindings);
        // 首先通过DynamicComponentLoader先加载一个MdDialogContainer组件，这个组件其实就是一个dialog固定的容器
        // 不了解DynamicComponentLoader的可以看这篇文章 https://github.com/kittencup/angular2-ama-cn/issues/21
        return this.componentLoader.loadNextToLocation(MdDialogContainer, elementRef)
            .then(containerRef => {
                // 该容器加载完后,dom应该是在elementRef的dom下面，所以通过dom操作将容器dom移动到body里
                var dialogElement = containerRef.location.nativeElement;
                DOM.appendChild(DOM.query('body'), dialogElement);
                // 通过config设置dialog
                if (isPresent(config.width)) {
                    DOM.setStyle(dialogElement, 'width', config.width);
                }
                if (isPresent(config.height)) {
                    DOM.setStyle(dialogElement, 'height', config.height);
                }
                // 将容器实例设置给dialogRef
                dialogRef.containerRef = containerRef;
                // 现在才是真正加载你的组件了，顺便提供了上面的bindings.这样你在组件里可以直接注入dialogRef对象
                // MdDialogContainer里有template,里面还会加载一个md-dialog-content组件，你可以理解这个组件就是一个占位符
                // 现在将你真正要打开的组件，加载到这个占位符下面，通过containerRef.instance.contentRef 获取到的就是这个占位符ElementRef
                // <body>
                //    <md-dialog-container>
                //        <md-dialog-content></md-dialog-content>
                //        <你要打开的组件></你要打开的组件>
                //    </md-dialog-container>
                // </body>
                return this.componentLoader.loadNextToLocation(type, containerRef.instance.contentRef,
                    bindings)
                    .then(contentRef => {
                        // 给dialogRef设置contentRef，设置完后表明dialog是已经打开状态
                        // dialogRef里会调用set contentRef方法，会给contentRefDeferred提供resolve值
                        // 这个很重要，contentRefDeferred有resolve值后，close里的contentRefDeferred的then了才有用
                        // 也就是说 没加载完。close方法是无效的
                        dialogRef.contentRef = contentRef;
                        // 原来的containerRef.instance.dialogRef指的是那个占位符md-dialog-content
                        // 但现在dialogRef实际应该是你打开组件的那个实例
                        containerRef.instance.dialogRef = dialogRef;
                        // dialog背景异步加载完就会触发外面这个then
                        backdropRefPromise.then(backdropRef => {
                            // 此时dialogRef.whenClosed并不会触发，只是给他注册个then,主要是用来销毁dialog背景组件的
                            // 任何组件被DynamicComponentLoader加载后，都会提供一个dispose方法来销毁它们
                            dialogRef.whenClosed.then((_) => { backdropRef.dispose(); });
                        });
                        return dialogRef;
                    });
            });
    }
}


export class MdDialogRef {
    set contentRef(value: ComponentRef) {
        this._contentRef = value;
        this.contentRefDeferred.resolve(value);
    }
    close(result: any = null) {
        // 上面调用contentRef方法后，contentRefDeferred才会设置resolve值，只有dialog加载完组件才会去调上面contentRef
        this.contentRefDeferred.promise.then((_) => {
            if (!this.isClosed) {
                this.isClosed = true;
                // 销毁容器组件
                this.containerRef.dispose();
                // 给whenClosedDeferred提供resolve值，上面open里的then就会被触发，这时dialog背景也会被注销
                this.whenClosedDeferred.resolve(result);
            }
        });
    }
}