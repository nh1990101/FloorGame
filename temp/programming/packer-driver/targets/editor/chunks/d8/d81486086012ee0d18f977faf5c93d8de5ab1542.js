System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Camera, Collider, Component, ERigidBodyType, Input, MeshRenderer, Node, PlaneCollider, PointToPointConstraint, Prefab, profiler, RigidBody, tween, Vec2, Vec3, AssetMgr, MainUI, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _crd, ccclass, property, GameController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAssetMgr(extras) {
    _reporterNs.report("AssetMgr", "./AssetMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMainUI(extras) {
    _reporterNs.report("MainUI", "./MainUI", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Camera = _cc.Camera;
      Collider = _cc.Collider;
      Component = _cc.Component;
      ERigidBodyType = _cc.ERigidBodyType;
      Input = _cc.Input;
      MeshRenderer = _cc.MeshRenderer;
      Node = _cc.Node;
      PlaneCollider = _cc.PlaneCollider;
      PointToPointConstraint = _cc.PointToPointConstraint;
      Prefab = _cc.Prefab;
      profiler = _cc.profiler;
      RigidBody = _cc.RigidBody;
      tween = _cc.tween;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      AssetMgr = _unresolved_2.AssetMgr;
    }, function (_unresolved_3) {
      MainUI = _unresolved_3.MainUI;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "01c83RmJFZIE4vEMATKowNf", "GameController", undefined);

      __checkObsolete__(['_decorator', 'BoxCollider', 'BoxCollider2D', 'Camera', 'Canvas', 'cclegacy', 'Collider', 'Color', 'Component', 'debug', 'DebugMode', 'director', 'DistanceJoint2D', 'EColliderType', 'ERigidBody2DType', 'ERigidBodyType', 'EventTouch', 'find', 'geometry', 'Graphics', 'HingeConstraint', 'HingeJoint2D', 'ICollisionEvent', 'Input', 'instantiate', 'Layers', 'lerp', 'MeshRenderer', 'Node', 'PhysicsSystem', 'PlaneCollider', 'PointToPointConstraint', 'Prefab', 'profiler', 'Quat', 'resources', 'RigidBody', 'RigidBody2D', 'SceneGlobals', 'Scheduler', 'Size', 'Sprite', 'tween', 'Tween', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec2 = property(_crd && AssetMgr === void 0 ? (_reportPossibleCrUseOfAssetMgr({
        error: Error()
      }), AssetMgr) : AssetMgr), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(_crd && MainUI === void 0 ? (_reportPossibleCrUseOfMainUI({
        error: Error()
      }), MainUI) : MainUI), _dec6 = property(Camera), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Node), _dec13 = property(Node), _dec14 = property(Node), _dec15 = property(Node), _dec16 = property(Node), _dec17 = property(Node), _dec18 = property({
        displayName: "命中准确系数"
      }), _dec19 = property({
        displayName: "锤摆最大角度"
      }), _dec20 = property({
        displayName: "吊绳水平摇摆最大距离"
      }), _dec21 = property({
        displayName: "吊绳缩放比"
      }), _dec(_class = (_class2 = class GameController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "assetMgr", _descriptor, this);

          _initializerDefineProperty(this, "skyBox", _descriptor2, this);

          _initializerDefineProperty(this, "skyBox2", _descriptor3, this);

          _initializerDefineProperty(this, "mainUI", _descriptor4, this);

          _initializerDefineProperty(this, "worldCamera", _descriptor5, this);

          _initializerDefineProperty(this, "craneGrowTemp", _descriptor6, this);

          _initializerDefineProperty(this, "holderRock", _descriptor7, this);

          _initializerDefineProperty(this, "holderLine", _descriptor8, this);

          _initializerDefineProperty(this, "holderCarry", _descriptor9, this);

          _initializerDefineProperty(this, "lineEndPoint", _descriptor10, this);

          _initializerDefineProperty(this, "holderTemp", _descriptor11, this);

          _initializerDefineProperty(this, "craneHolder", _descriptor12, this);

          _initializerDefineProperty(this, "floorTemp", _descriptor13, this);

          _initializerDefineProperty(this, "floorContainer", _descriptor14, this);

          _initializerDefineProperty(this, "floorBornPos", _descriptor15, this);

          _initializerDefineProperty(this, "hold", _descriptor16, this);

          _initializerDefineProperty(this, "dropScan", _descriptor17, this);

          _initializerDefineProperty(this, "rockMaxAngle", _descriptor18, this);

          _initializerDefineProperty(this, "craneMoveMaxX", _descriptor19, this);

          _initializerDefineProperty(this, "craneMoveMaxY", _descriptor20, this);

          /**高楼最大锤摆角 */
          this.maxRockRotation = 0.0;

          /**掉落判断偏移值 */
          this.dropDistance = void 0;
          this.floorContainerRockFrequency = 1;
          this.floorRockTick = 0;
          this.sky1Height = void 0;
          this.sky2Height = void 0;
          this.MAIN_CAMERA_POS = new Vec3(0, 3, 14);
          this.TOUCH_AROUND_TIME = 1.0;
          this.craneGrows = void 0;
          this.floorSpeed = void 0;
          this._floorNodes = void 0;
          this._isCanCreateNext = true;
          this._connectFloors = [];
          this._floorOffNum = 0;
          this._floorOffset = 0;
          this._dropBox = void 0;
          this._isUseJerryState = false;
          this._dropBoxPos = void 0;
          this._holderEurAngle = void 0;
          this._holderPos = void 0;
          this._holderLineScale = void 0;
          this._holderLineOldScale = void 0;
          this.roTime = 0;
          this.touchTime = -1;
          this.beginTouchPos = void 0;
          this.mouseMovePos = void 0;
          this.cameraMoveVec = void 0;
          this.isWatchState = void 0;
          this.floorFirstName = "floor_1_0";
          this.floorName = "floor_1_1";
          this.watchPos = void 0;
          this.lerpTime = 0;
        }

        /**获取最后一层楼高度 */
        get floorHeight() {
          var len = this._floorNodes.length;
          var floorNode;

          if (len > 1) {
            floorNode = this._floorNodes[len - 2];
          } else if (len > 0) {
            floorNode = this.getLastFloor();
          } else {
            return 0;
          }

          return this.getMeshSize(floorNode).y * 2;
        }

        start() {
          this.assetMgr.preLoadBundles().then(this.createNewBox.bind(this));
          profiler.hideStats();
          this._floorNodes = [];
          this.worldCamera.node.setPosition(this.MAIN_CAMERA_POS);
          var floorCollider = this.floorTemp.getComponent(PlaneCollider);
          floorCollider.material.restitution = 0;
          floorCollider.sharedMaterial.restitution = 0;
          this.floorSpeed = new Vec3();
          this._holderEurAngle = new Vec3();
          this.craneGrows = [];
          this.mainUI.node.on(Input.EventType.TOUCH_END, this.onClickMainUI, this);
          this.mainUI.node.on(Input.EventType.TOUCH_START, this.onClickStart, this);
          this.mainUI.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this._holderPos = this.holderRock.getPosition();
          this._holderLineOldScale = this.holderLine.getWorldScale().clone();
          this._holderLineScale = this._holderLineOldScale.clone();
        }

        update(deltaTime) {
          this.roTime += deltaTime;
          this.floorRockTick += deltaTime;

          if (this.touchTime >= 0) {
            this.touchTime += deltaTime;
          }

          if (this.touchTime >= this.TOUCH_AROUND_TIME) {
            this.isWatchState = true;
            var pos = this.getLastFloor().getWorldPosition();
            this.watchPos = new Vec3(pos.x, pos.y, pos.z);
          }

          this.floorContainer.angle = Math.sin(this.floorRockTick * this.floorContainerRockFrequency) * this.maxRockRotation;
          this._holderEurAngle.x = Math.sin(this.roTime * 2) * this.rockMaxAngle;
          this.holderRock.eulerAngles = this._holderEurAngle;
          this._holderPos.z += this.craneMoveMaxX * Math.sin(this.roTime * 2);
          this._holderLineScale.y = this._holderLineOldScale.y + this.craneMoveMaxY * this._holderLineOldScale.y * Math.cos(this.roTime * 2); //(1 + this.craneMoveMaxY * Math.sin(this.roTime * 2));

          this.holderLine.setWorldScale(this._holderLineScale);
          this.holderRock.setPosition(this._holderPos);
          this.holderCarry.setWorldPosition(this.lineEndPoint.getWorldPosition());

          if (this._isCanCreateNext && this._dropBox && this._dropBox.node && this._dropBox.node.parent == this.holderTemp) {
            if (this._dropBoxPos) {
              Vec3.subtract(this._dropBoxPos, this._dropBox.node.worldPosition, this._dropBoxPos); // if (this._dropBoxPos.y < 0) {//防止上一帧dropBox已经掉落导致位置问题

              Vec3.multiplyScalar(this.floorSpeed, this._dropBoxPos, 1 / deltaTime);
              this.floorSpeed.x *= 3;
              this.floorSpeed.y = -10; // }
            }

            this._dropBoxPos = this._dropBox.node.worldPosition.clone();
          }
        }

        initFloorData(obj, pos, speed) {
          var preFloor = this.getLastFloor();

          if (!preFloor) {
            preFloor = obj;
          }

          this._floorNodes.push(obj);

          obj.setParent(this.node, true);
          var rig = obj.getComponent(RigidBody);
          rig.angularFactor = Vec3.UNIT_Z;
          rig.getComponent(Collider).isTrigger = false;
          rig.useGravity = true;
          rig.setLinearVelocity(new Vec3(speed.x / 7, speed.y, 0));
          let collider = obj.getComponent(Collider); // 监听触发事件

          collider.once("onCollisionEnter", this.onEnterCollision, this);
        }

        onEnterCollision(event) {
          var lastFloor = this.getLastFloor();
          lastFloor.setParent(this.floorContainer, true);
          lastFloor.eulerAngles = Vec3.ZERO;
          this.onCollision(event); // tween(lastFloor).to(0.1, { eulerAngles: Vec3.ZERO }).call(this.onCollision.bind(this)).start();
        }

        getFloorName() {
          if (this._floorNodes.length < 1) {
            return this.floorFirstName;
          }

          return this.floorName;
        }
        /**固定楼层 */


        frozenFloor(rightBody) {
          rightBody.type = ERigidBodyType.STATIC;
          rightBody.linearFactor = Vec3.ZERO;
          rightBody.angularFactor = Vec3.ZERO; // rightBody.node.eulerAngles = Vec3.ZERO;
        }

        connectFloor(floor, preFoor) {
          var ppc = preFoor.addComponent(PointToPointConstraint);
          var rig = floor.getComponent(RigidBody);
          rig.useGravity = false;
          ppc.connectedBody = rig;
          ppc.pivotA = new Vec3(floor.worldPosition.x - preFoor.worldPosition.x, 1, 0);

          this._connectFloors.push(rig);
        }

        removeFloor(floor) {
          this.assetMgr.removeInstant(floor);

          var index = this._floorNodes.indexOf(floor);

          this._floorNodes.splice(index, 1);
        }

        onCollision(event) {
          var lenFloor = this._floorNodes.length;

          if (lenFloor > 0) {
            var lastFloor = this.getLastFloor();
            var rightBody = lastFloor.getComponent(RigidBody);

            if (lenFloor > 1) {
              var preFloor = this._floorNodes[lenFloor - 2];
              var forceDir = lastFloor.worldPosition.x - preFloor.worldPosition.x;
              var lastFloorMeshSize = this.getMeshSize(lastFloor);
              var boxH = lastFloorMeshSize.y + this.floorHeight * 0.5;
              var boxWHalf = lastFloorMeshSize.x;
              var dis = Vec3.distance(preFloor.position, lastFloor.position); //Math.abs(preFloor.worldPosition.x - lastFloor.worldPosition.x);

              this.dropDistance = Math.sqrt(boxH * boxH + boxWHalf * boxWHalf) * this.dropScan;
              console.log("距离：" + dis + ",最大距离差：" + this.dropDistance);
              var offset = dis - this.dropDistance;

              if (offset >= 0) {
                lastFloor.getComponent(Collider).isTrigger = true;
                rightBody.clearState(); // = Vec3.ZERO

                rightBody.angularFactor = Vec3.ZERO;
                lastFloor.setParent(this.node, true);
                var offAngle = 10.0 + offset / this.dropDistance * 90; // rightBody.linearFactor = Vec3.ONE
                // var forcePos = new Vec3(0, 0, 0);

                var targetAngle;

                if (preFloor.worldPosition.x < lastFloor.worldPosition.x) {
                  targetAngle = -offAngle;
                  rightBody.setLinearVelocity(new Vec3(1, -9, 5)); // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, 50);
                  // forcePos.x = 10;

                  console.log("往右掉下来");
                } else {
                  // forcePos.x = -10;
                  targetAngle = offAngle;
                  rightBody.setLinearVelocity(new Vec3(-1, -9, 5)); // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, -50);

                  console.log("往左掉下来");
                }

                tween(lastFloor).to(0.5, {
                  angle: targetAngle
                }).start();
                this.scheduleOnce(() => {
                  this.removeFloor(lastFloor);
                  this.createNewBox();
                  this.canCreateFunc();
                }, 1);
              } else {
                this.frozenFloor(rightBody);
                var pos = lastFloor.position; //防止碰撞检测延时所以固定了Y

                lastFloor.setPosition(pos.x, preFloor.position.y + this.floorHeight, pos.z);
                lastFloor.rotation = preFloor.rotation;

                if (this.checkIsPerfactPos(lastFloor.position.x, preFloor.position.x)) {
                  //完美命中
                  var lastPos = lastFloor.position;
                  lastFloor.setPosition(preFloor.position.x, lastPos.y, lastPos.z);
                  console.log("完美命中");
                  this.rockHandler(0);
                } else {
                  console.log("命中");
                  this.rockHandler(forceDir);
                }

                this.focuseLastFloorPos(lastFloor);
              }
            } else {
              this.focuseLastFloorPos(lastFloor);
              this.frozenFloor(rightBody);
            }
          }
        }

        checkIsPerfactPos(matchX, targetX) {
          return Math.abs(matchX - targetX) < 0.05;
        }

        getMeshSize(node, scaleVec = Vec3.ONE) {
          let mesh = node.getComponent(MeshRenderer);

          if (mesh) {
            var modelHalf = mesh.model.modelBounds.halfExtents.clone();
            modelHalf.multiply(node.getWorldScale()); //*= node.scale.y;

            modelHalf.multiply(scaleVec);
            return modelHalf;
          }
        }

        createCraneGrow() {
          this.assetMgr.getRes("CraneGrow", Prefab, "components").then(data => {
            var obj = this.assetMgr.instantiate(data);
            obj.setParent(this.craneGrowTemp);
            var modelSize = this.getMeshSize(obj);
            var scale = this.floorHeight / (modelSize.z * 2);
            obj.setScale(obj.scale.x, obj.scale.y, scale);
            var pos = obj.getWorldPosition();
            this.craneGrows.push(obj);
            pos.y = obj.parent.worldPosition.y + (this.craneGrows.length - 1) * this.floorHeight;
            obj.setWorldPosition(pos); // obj.setWorldPosition(pos.x, pos.y + (this.craneGrows.length) * this.floorHeight , pos.z);

            var targetPos = new Vec3(pos.x, pos.y + this.floorHeight, pos.z);
            tween(obj).to(0.2, {
              worldPosition: targetPos
            }).start();
          });
        }

        canCreateFunc() {
          this._isCanCreateNext = true;
        }

        resetCameraPos(floor, during = 0.2) {
          var wolrdPos = floor.getWorldPosition();
          wolrdPos.x = this.MAIN_CAMERA_POS.x;
          wolrdPos.z = this.MAIN_CAMERA_POS.z;
          wolrdPos.y += 1.8;
          return tween(this.worldCamera.node).to(during, {
            worldPosition: wolrdPos,
            eulerAngles: Vec3.ZERO
          });
        }
        /**相机跟踪最后一块楼层 */


        focuseLastFloorPos(floor) {
          this.createCraneGrow();
          var wolrdPos = floor.getWorldPosition();
          wolrdPos.x = this.MAIN_CAMERA_POS.x;
          wolrdPos.z = this.MAIN_CAMERA_POS.z;
          wolrdPos.y += 1.8;
          this.resetCameraPos(floor).call(this.canCreateFunc.bind(this)).start(); // this.worldCamera.node.lookAt(floor.getWorldPosition())

          var cranePos = this.craneHolder.getWorldPosition();
          cranePos.y += this.floorHeight;
          tween(this.craneHolder).to(0.2, {
            worldPosition: cranePos
          }).start(); // this.craneHolder.setWorldPosition(cranePos)
          // this.createNewBox();

          if (!this.sky1Height) {
            let modelCenter = this.getMeshSize(this.skyBox);
            this.sky1Height = modelCenter.y;
          }

          if (!this.sky2Height) {
            let modelCenter = this.getMeshSize(this.skyBox2);
            this.sky2Height = modelCenter.y;
          }

          var numFloor = this._floorNodes.length;
          this.mainUI.setFloorNum(numFloor); //天空1处理

          var rate = this.floorHeight / this.sky1Height;
          var alpha = numFloor * rate;
          this.changeSkyBoxAlpha(this.skyBox, 1 - alpha, false); //天空2处理

          if (alpha >= 1) {
            //已冲破第一层天空
            var rate2 = this.floorHeight / (this.sky2Height - this.sky1Height);
            alpha = (numFloor - 1 / rate) * rate2;
            this.changeSkyBoxAlpha(this.skyBox2, 1 - alpha, false);
          } else {//还在第一层
            // this.changeSkyBoxAlpha(this.skyBox2, 0, true)
          }

          this.createNewBox();
        }

        createNewBox() {
          // this.assetMgr.getRes("BaseBox", Prefab, "components").then(data => { this.createBox(data) })
          this._dropBoxPos = null;
          this.assetMgr.getRes(this.getFloorName(), Prefab, "components").then(data => {
            this.createFloorBox(data);
          });
        }

        createFloorBox(box) {
          if (box) {
            var obj = this.assetMgr.instantiate(box);

            if (obj) {
              var rig = obj.getComponent(RigidBody);
              rig.angularFactor = Vec3.ZERO;
              rig.getComponent(Collider).isTrigger = true;
              rig.useGravity = false;
              this._dropBox = rig;
              obj.setParent(this.holderTemp);
            }
          }
        }

        getLastFloor() {
          var len = this._floorNodes.length;

          if (this._floorNodes.length > 0) {
            return this._floorNodes[len - 1];
          }

          return null;
        }

        onClickMainUI() {
          this.touchTime = -1;

          if (this.isWatchState) {
            this.isWatchState = false;
            console.log("结束观看");
            this.resetCameraPos(this.getLastFloor(), 1.0).start();
            return;
          }

          console.log("点击了");

          if (this._isCanCreateNext) {
            var dropFloor = this._dropBox.node;

            if (dropFloor) {
              this._isCanCreateNext = false;
              this.initFloorData(dropFloor, dropFloor.worldPosition, this.floorSpeed);
            }
          }
        }

        onClickStart(e) {
          this.touchTime = 0;
          this.beginTouchPos = e.getLocation();
        }

        onTouchMove(e) {
          if (!this.isWatchState) {
            return;
          }

          this.mouseMovePos = e.getLocation();

          if (!this.cameraMoveVec) {
            this.cameraMoveVec = new Vec2();
          }

          if (this._floorNodes.length > 0) {
            Vec2.subtract(this.cameraMoveVec, this.beginTouchPos, this.mouseMovePos);
            this.cameraMoveVec.multiplyScalar(0.05); // if (this.cameraMoveVec.y < 0) {
            //     this.cameraMoveVec.y = 0;
            // }

            var centerVec = this.watchPos.clone();
            var R = this.MAIN_CAMERA_POS.z;
            var value = R * R - this.cameraMoveVec.x * this.cameraMoveVec.x - this.cameraMoveVec.y * this.cameraMoveVec.y;
            var dir = value >= 0 ? 1 : -1;
            var absValue = Math.abs(value);
            var zValue = Math.sqrt(absValue) * dir;
            var targetPos = new Vec3(this.cameraMoveVec.x, this.cameraMoveVec.y + centerVec.y + 1.8, zValue);
            this.worldCamera.node.setWorldPosition(targetPos);
            centerVec.y += 1.8;
            this.worldCamera.node.lookAt(centerVec);
          }
        }
        /**根据偏移值进行处理摇摆效果 */


        rockHandler(offset) {
          var lenFloor = this._floorNodes.length;
          var rate = 1.5 - lenFloor * 0.003;

          if (rate < 0) {
            rate = 0;
          }

          this._floorOffNum += Math.abs(offset) * rate;
          this._floorOffset += offset; // this.floorRockTick = this.floorContainerRockFrequency

          this.floorContainerRockFrequency = this.limit(1 + lenFloor * 0.01, 1, 3); // this.floorContainer.angle = Math.sin(this.floorRockTick * this.floorContainerRockFrequency) * this.maxRockRotation;

          var pos = this.getLastFloor().getWorldPosition();
          this.maxRockRotation = Math.atan(this._floorOffNum / pos.y);
          var angle = this.floorContainer.angle / this.maxRockRotation;

          if (this.maxRockRotation && angle >= -1 && angle <= 1) {
            this.floorRockTick = Math.asin(angle) / this.floorContainerRockFrequency;
          }
        }

        limit(num, min, max) {
          return Math.min(Math.max(num, min), max);
        }

        changeSkyBoxAlpha(node, alpha, addMode) {
          if (!addMode && alpha < 0) {
            alpha = 0;
          } else if (addMode && alpha > 1) {
            alpha = 1;
          }

          if (node) {
            var mr = node.getComponent(MeshRenderer);
            var mat = mr.material;
            var pass = mat.passes[0];
            pass.setUniform(pass.getHandle("transparencyFactor"), alpha);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "assetMgr", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "skyBox", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skyBox2", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "mainUI", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "worldCamera", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "craneGrowTemp", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "holderRock", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "holderLine", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "holderCarry", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "lineEndPoint", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "holderTemp", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "craneHolder", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "floorTemp", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "floorContainer", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "floorBornPos", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "hold", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "dropScan", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "rockMaxAngle", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 15.0;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "craneMoveMaxX", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.0001;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "craneMoveMaxY", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d81486086012ee0d18f977faf5c93d8de5ab1542.js.map