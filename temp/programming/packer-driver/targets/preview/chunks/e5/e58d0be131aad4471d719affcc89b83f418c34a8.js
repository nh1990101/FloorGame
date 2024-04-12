System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, math, MainView, _dec, _class, _crd, ccclass, property, Main;

  _export("MainView", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      math = _cc.math;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "73612wPZuFPyaHY3fwRr8K4", "Main", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'math']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Main", Main = (_dec = ccclass('Main'), _dec(_class = class Main extends Component {
        start() {
          console.log("begin");
        }

        update(deltaTime) {
          this.node.rotate(math.Quat.IDENTITY);
          var mainView = new MainView();
          this.updateView(mainView, "init");
        }

        updateView(caller, func) {
          console.log(typeof caller);
          var call = caller[func];

          if (typeof call == "function") {
            call();
          }
        }

      }) || _class));

      _export("MainView", MainView = class MainView {
        update() {
          console.log("update");
        }

        init() {
          console.log("init");
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e58d0be131aad4471d719affcc89b83f418c34a8.js.map