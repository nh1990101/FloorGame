System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Material, MeshRenderer, Vec3, Vec4, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, Mass;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAssetMgr(extras) {
    _reporterNs.report("AssetMgr", "./AssetMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Material = _cc.Material;
      MeshRenderer = _cc.MeshRenderer;
      Vec3 = _cc.Vec3;
      Vec4 = _cc.Vec4;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5b1b2d6GYdF3bjuxpxbPvIV", "Mass", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EffectAsset', 'ImageAsset', 'Material', 'MeshRenderer', 'Node', 'Vec3', 'Vec4']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Mass", Mass = (_dec = ccclass('Mass'), _dec2 = property(Number), _dec3 = property(Number), _dec(_class = (_class2 = class Mass extends Component {
        constructor(...args) {
          super(...args);
          this.assetMgr = void 0;
          this.mat = void 0;
          this.followPos = void 0;
          //从动点位置
          this.massVelocity = void 0;

          //从动点速度
          _initializerDefineProperty(this, "stiffness", _descriptor, this);

          //劲度系数
          _initializerDefineProperty(this, "damping", _descriptor2, this);

          //阻尼系数
          this.max = void 0;
          this.min = void 0;
          //模型在模型空间最高, 最低点的y值
          this.bound = void 0;
          // private _delayMoveTime = 0.5;
          // private _curTime = 0;
          this._moveDir = void 0;
          this.myPos = void 0;
          this.vec4FollowPos = void 0;
          this._moveStep = 0.01;
          this._massVec = new Vec3();
          this._forceDir = new Vec3();
          this.isLoadComplete = void 0;
        }

        start() {
          this.massVelocity = new Vec3(0.0, 0.0, 0.0);
          this.followPos = this.node.worldPosition.clone(); //虚拟抽象一个从动点
          // this.assetMgr.getRes("MassObj", EffectAsset, "shader").then((data) => { this.initShader(data); })

          var bound = this.getComponent(MeshRenderer).model.modelBounds.halfExtents;
          this.bound = bound; //使用加载好的 effect 初始化材质

          var mt = new Material();
          mt.copy(this.getComponent(MeshRenderer).sharedMaterial); // mt.initialize({ effectAsset: data, technique: 0 });

          this.getComponent(MeshRenderer).sharedMaterials = [mt];
          this.mat = mt;
          var pass = this.mat.passes[0];
          pass.setUniform(pass.getHandle("_MeshH"), bound.y * 2); //模型总高度

          this.myPos = new Vec4(this.node.position.x, this.node.position.y, this.node.position.z, 1.0);
          this.isLoadComplete = true;
        }

        initShader(data) {
          var bound = this.getComponent(MeshRenderer).model.modelBounds.halfExtents;
          this.bound = bound; //使用加载好的 effect 初始化材质

          var mt = new Material();
          mt.copy(this.getComponent(MeshRenderer).sharedMaterial);
          mt.initialize({
            effectAsset: data,
            technique: 0
          });
          this.getComponent(MeshRenderer).sharedMaterials = [mt];
          this.mat = mt;
          var pass = this.mat.passes[0];
          pass.setUniform(pass.getHandle("_MeshH"), bound.y * 2); //模型总高度

          this.myPos = new Vec4(this.node.position.x, this.node.position.y, this.node.position.z, 1.0);
          this.isLoadComplete = true;
        }

        update(deltaTime) {
          if (!this.isLoadComplete) {
            return;
          } //进行一些受力, 加速度, 速度, 路程, 运动 的数值计算


          var force = this.GetMainForce(); //弹力

          force.add(this.GetDampingForce()); //阻力

          this.massVelocity.add(force.multiplyScalar(deltaTime)); //将固定质量为1, 则force数值等于加速度数值

          Vec3.multiplyScalar(this._massVec, this.massVelocity, deltaTime);
          this.followPos.add(this._massVec); //从动点的移动
          //为shader传入数据

          this.SetMatData();
        }

        GetMainForce() {
          //胡克定律
          Vec3.subtract(this._forceDir, this.node.worldPosition, this.followPos);
          return this._forceDir.multiplyScalar(this.stiffness);
        }

        GetDampingForce() {
          Vec3.multiplyScalar(this._massVec, this.massVelocity, -this.damping);
          return this._massVec; //弹簧阻尼
        }

        SetMatData() {
          var pass = this.mat.passes[0];
          this.myPos = this.vec32vec4(this.node.worldPosition, this.myPos);
          this.vec4FollowPos = this.vec32vec4(this.followPos, this.vec4FollowPos);
          pass.setUniform(pass.getHandle("_MainPos"), this.myPos); //主动点

          pass.setUniform(pass.getHandle("_FollowPos"), this.vec4FollowPos); //从动点

          pass.setUniform(pass.getHandle("_W_Bottom"), this.node.worldPosition.y - this.bound.y); //模型最低点y值
        }

        vec32vec4(vec3, vec4) {
          if (!vec4) {
            vec4 = new Vec4();
          }

          vec4.x = vec3.x;
          vec4.y = vec3.y;
          vec4.z = vec3.z;
          vec4.w = 1.0;
          return vec4;
        } // set enabled(val:boolean){
        //     if(val){
        //         this.
        //     }
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "stiffness", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 60.0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "damping", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2.0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d7ce714109f22e60742f21fa28593d705054f89c.js.map