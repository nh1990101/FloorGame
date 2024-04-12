System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, assetManager, Component, instantiate, _dec, _class, _crd, BUNDLE_NAMES, ccclass, property, AssetMgr;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      assetManager = _cc.assetManager;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b8576Re0KpL15hm4Qxw4B0J", "AssetMgr", undefined);

      _export("BUNDLE_NAMES", BUNDLE_NAMES = ["components"]);

      __checkObsolete__(['_decorator', 'Asset', 'assetManager', 'AssetManager', 'Component', 'director', 'instantiate', 'Node', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AssetMgr", AssetMgr = (_dec = ccclass('AssetMgr'), _dec(_class = class AssetMgr extends Component {
        constructor() {
          super(...arguments);
          this.mapBundleAssets = new Map();
        }

        start() {}

        update(deltaTime) {}
        /**预加载资源 */


        preLoadBundles() {
          var arrPromise = [];
          var len = BUNDLE_NAMES.length;

          for (var i = 0; i < len; i++) {
            arrPromise.push(this.loadBundles(BUNDLE_NAMES[i]));
          }

          return Promise.all(arrPromise);
        }

        loadBundles(bundleName) {
          return new Promise((resolve, reject) => {
            assetManager.loadBundle(bundleName, (err, data) => {
              if (err) {
                console.error("bundle加载失败：" + err.message);
                reject(err);
              } else {
                this.mapBundleAssets.set(data.name, data);
                resolve(data);
              }
            });
          });
        }

        getRes(name, cls, bundleName) {
          if (!bundleName) {
            bundleName = BUNDLE_NAMES[0];
          }

          if (bundleName) {
            var bundle = this.mapBundleAssets.get(bundleName);

            if (bundle) {
              return this.getResByBundle(name, cls, bundle);
            } else {
              this.loadBundles(bundleName).then(data => {
                return this.getResByBundle(name, cls, data);
              });
            }
          }
        }

        getResByBundle(name, cls, bundle) {
          if (bundle) {
            return new Promise((resolve, reject) => {
              bundle.load(name, cls, null, (err, data) => {
                if (err) {
                  console.error(err.message);
                  reject(err);
                } else {
                  resolve(data);
                }
              });
            });
          }
        }

        instantiate(data) {
          return instantiate(data);
        }

        removeInstant(node) {
          if (node) {
            return node.destroy();
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=07c6df2c0ee8183ff11dba7703477a0d3b4c0859.js.map