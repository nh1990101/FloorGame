System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BoxCollider, Camera, Collider, Color, Component, DistanceJoint2D, ERigidBodyType, find, geometry, Graphics, HingeConstraint, Input, Layers, MeshRenderer, Node, PhysicsSystem, PlaneCollider, PointToPointConstraint, Prefab, RigidBody, RigidBody2D, tween, UITransform, Vec2, Vec3, AssetMgr, Mass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _crd, ccclass, property, GameController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAssetMgr(extras) {
    _reporterNs.report("AssetMgr", "./AssetMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMass(extras) {
    _reporterNs.report("Mass", "./Mass", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      BoxCollider = _cc.BoxCollider;
      Camera = _cc.Camera;
      Collider = _cc.Collider;
      Color = _cc.Color;
      Component = _cc.Component;
      DistanceJoint2D = _cc.DistanceJoint2D;
      ERigidBodyType = _cc.ERigidBodyType;
      find = _cc.find;
      geometry = _cc.geometry;
      Graphics = _cc.Graphics;
      HingeConstraint = _cc.HingeConstraint;
      Input = _cc.Input;
      Layers = _cc.Layers;
      MeshRenderer = _cc.MeshRenderer;
      Node = _cc.Node;
      PhysicsSystem = _cc.PhysicsSystem;
      PlaneCollider = _cc.PlaneCollider;
      PointToPointConstraint = _cc.PointToPointConstraint;
      Prefab = _cc.Prefab;
      RigidBody = _cc.RigidBody;
      RigidBody2D = _cc.RigidBody2D;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      AssetMgr = _unresolved_2.AssetMgr;
    }, function (_unresolved_3) {
      Mass = _unresolved_3.Mass;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "01c83RmJFZIE4vEMATKowNf", "GameController", undefined);

      __checkObsolete__(['_decorator', 'BoxCollider', 'BoxCollider2D', 'Camera', 'Canvas', 'cclegacy', 'Collider', 'Color', 'Component', 'director', 'DistanceJoint2D', 'EColliderType', 'ERigidBody2DType', 'ERigidBodyType', 'find', 'geometry', 'Graphics', 'HingeConstraint', 'HingeJoint2D', 'ICollisionEvent', 'Input', 'instantiate', 'Layers', 'MeshRenderer', 'Node', 'PhysicsSystem', 'PlaneCollider', 'PointToPointConstraint', 'Prefab', 'Quat', 'resources', 'RigidBody', 'RigidBody2D', 'Size', 'Sprite', 'tween', 'Tween', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec2 = property(_crd && AssetMgr === void 0 ? (_reportPossibleCrUseOfAssetMgr({
        error: Error()
      }), AssetMgr) : AssetMgr), _dec3 = property(RigidBody2D), _dec4 = property(RigidBody2D), _dec5 = property(RigidBody), _dec6 = property(RigidBody), _dec7 = property(Graphics), _dec8 = property(Graphics), _dec9 = property(Node), _dec10 = property(Camera), _dec11 = property(Camera), _dec12 = property(Camera), _dec13 = property(UITransform), _dec14 = property(Node), _dec15 = property(Node), _dec16 = property(Node), _dec17 = property(Node), _dec18 = property(Node), _dec19 = property(Node), _dec20 = property(Node), _dec21 = property(Node), _dec22 = property({
        displayName: "命中衰减振幅系数"
      }), _dec23 = property({
        displayName: "楼层高度振幅系数"
      }), _dec24 = property({
        displayName: "振幅衰减阻尼系数"
      }), _dec25 = property({
        displayName: "振幅系数"
      }), _dec26 = property({
        displayName: "命中准确系数"
      }), _dec(_class = (_class2 = class GameController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "assetMgr", _descriptor, this);

          _initializerDefineProperty(this, "baseBox", _descriptor2, this);

          _initializerDefineProperty(this, "staticBody", _descriptor3, this);

          _initializerDefineProperty(this, "cordStatic", _descriptor4, this);

          _initializerDefineProperty(this, "cord", _descriptor5, this);

          _initializerDefineProperty(this, "myGraph", _descriptor6, this);

          _initializerDefineProperty(this, "uiGraph", _descriptor7, this);

          _initializerDefineProperty(this, "mainUI", _descriptor8, this);

          _initializerDefineProperty(this, "worldCamera", _descriptor9, this);

          _initializerDefineProperty(this, "uiCamera", _descriptor10, this);

          _initializerDefineProperty(this, "cordCamera", _descriptor11, this);

          _initializerDefineProperty(this, "uiTransform", _descriptor12, this);

          _initializerDefineProperty(this, "holder", _descriptor13, this);

          _initializerDefineProperty(this, "hitArea", _descriptor14, this);

          _initializerDefineProperty(this, "floorTemp", _descriptor15, this);

          _initializerDefineProperty(this, "testNode", _descriptor16, this);

          _initializerDefineProperty(this, "firstFloor", _descriptor17, this);

          _initializerDefineProperty(this, "floorStatic", _descriptor18, this);

          _initializerDefineProperty(this, "floorContainer", _descriptor19, this);

          _initializerDefineProperty(this, "floorBornPos", _descriptor20, this);

          _initializerDefineProperty(this, "reduceRate", _descriptor21, this);

          _initializerDefineProperty(this, "floorRockRate", _descriptor22, this);

          _initializerDefineProperty(this, "floorRockDamping", _descriptor23, this);

          /**振幅系数 */
          _initializerDefineProperty(this, "floorRockForce", _descriptor24, this);

          _initializerDefineProperty(this, "dropScan", _descriptor25, this);

          this.dj2d = void 0;
          this.beRotateObj = void 0;
          this.scanAngle = void 0;
          this._moveDir = 50;
          this.distance = 300;
          // private localCenter: Vec2;
          this.forceVec = void 0;
          this._curTick = 0;
          this.disForceTime = 2;
          this.MaxAngle = 30;
          this.DOWN_DIR = new Vec3(0, -1, 0);

          /**掉落判断偏移值 */
          this.DROP_DISTANCE = void 0;
          this.HOLDER_BASE_POS = new Vec3(0, 700, 0);
          this.MAIN_CAMERA_POS = new Vec3(0, 3, 10);
          this.FORCE_CONTAINER_TIME = 1;
          // public MAX_DISTANCE: number;
          this.HOLDER_DIS_POS_Y = void 0;
          this.isMove = false;
          this.myPosBegin = void 0;
          this.myTargetPoint = void 0;
          this.dropRay = void 0;
          this.floorSpeed = void 0;
          this.dropVec = void 0;
          this._floorNodes = void 0;
          this._isCanCreateNext = true;
          this._failFloor = void 0;
          this._failForcePos = void 0;
          this._floorContainerGav = new Vec3(0, 20, 0);
          this._forceContainerTime = 0;
          this._floorContainerForce = new Vec3(1, 0, 0);
          this._gavVec = new Vec3(0, -10, 0);
          this._applyLastFloorForce = new Vec3(0.2, 0, 0);
          this._connectFloors = [];
          this._maxContainerRo = 0;
          this._targetContainerRo = 0;
          this._floorOffset = 0;
          this._dropBox = void 0;
          this._isUseJerryState = void 0;
          this._isRock = true;
          //是否摇晃
          this._roVec = void 0;
          this._preOffSet = 0;
        }

        start() {
          this.assetMgr.preLoadBundles().then(this.createNewBox.bind(this)); // PhysicsSystem.instance.restitution=

          if (this.staticBody) {
            var distance2D = this.staticBody.getComponent(DistanceJoint2D);
            this.dj2d = distance2D;
            this.forceVec = new Vec2(this._moveDir, 0);
            this.myGraph.lineWidth = 10;
            this.myGraph.lineCap = Graphics.LineCap.ROUND;
            this.myGraph.strokeColor = Color.BLUE;
            this.myPosBegin = new Vec3();
            this.myTargetPoint = new Vec3();
            this.dropRay = new geometry.Ray();
            this._floorNodes = [];
            this.holder.setPosition(this.HOLDER_BASE_POS);
            this.worldCamera.node.setPosition(this.MAIN_CAMERA_POS);
            var floorCollider = this.floorTemp.getComponent(PlaneCollider);
            floorCollider.material.restitution = 0;
            floorCollider.sharedMaterial.restitution = 0;
            this.floorSpeed = new Vec3();
            this.dropVec = new Vec3();
            this._roVec = new Vec3(); // this.floorContainer.getComponent(RigidBody).applyLocalTorque(new Vec3(0, 0, 100))
            // let tweenDuration: number = 2.0;
            // let angle = 2;
            // let embedTween = tween(this.floorTemp).to(tweenDuration, { eulerAngles: new Vec3(0, 0, angle * 2) }, { easing: "cubicOut" }).to(tweenDuration, { eulerAngles: new Vec3(0, 0, -angle * 2) }, { easing: "cubicOut" }).union();
            // tween(this.floorTemp).to(tweenDuration / 2, { eulerAngles: new Vec3(0, 0, -angle) }, { easing: "cubicOut" }).call(() => {
            //     embedTween.repeatForever().start();
            // }).start();
          }

          this.mainUI.on(Input.EventType.TOUCH_START, this.onClickMainUI, this);
        }

        update(deltaTime) {
          this._curTick += deltaTime;

          if (!this.isMove) {
            this.cord.applyForce(new Vec3(5, 0, 0)); // this.baseBox.applyForceToCenter(this.forceVec, true);

            if (this._curTick > this.disForceTime) {
              this.isMove = true;
            }
          }

          if (this.cordStatic) {}

          if (this._failFloor) {// this._failFloor.applyForce(this._failForcePos)
          }

          this._forceContainerTime += deltaTime;
          var containerRig = this.floorContainer.getComponent(RigidBody);

          if (this._isRock && this._floorOffset > 0 && this._forceContainerTime < this.FORCE_CONTAINER_TIME) {
            containerRig.applyForce(this._floorContainerForce);
          }

          if (this._isRock) {
            containerRig.applyForce(this._floorContainerGav);
          }

          var ro = Math.abs(this.floorContainer.eulerAngles.z);
          containerRig.getLinearVelocity(this._roVec);

          if (Math.abs(this._roVec.x) <= 0.01) {
            this._maxContainerRo = ro;
          }

          if (this._maxContainerRo <= this._targetContainerRo && this._targetContainerRo > 0) {
            containerRig.linearDamping = 0;
          }
        }

        onCheckHitFunc() {
          var mask = 0xffffffff;
          var maxDistance = 10000000;
          var queryTrigger = true;

          if (PhysicsSystem.instance.raycast(this.dropRay)) {
            var raycastResults = PhysicsSystem.instance.raycastResults;
            raycastResults.forEach(rayRes => {
              var collider = rayRes.collider;

              if (raycastResults && collider.node.uuid == this.hitArea.uuid) {
                var hitPoint = rayRes.hitPoint;
                this.createFloor(hitPoint, this.floorSpeed);
              }
            });
          }
        }

        createFloor(pos, speed) {
          this.assetMgr.getRes("BoxFloor", Prefab, "components").then(data => {
            this.initFloor(data, pos, speed);
          });
        }

        initFloor(floor, pos, speed) {
          if (floor) {
            var obj = this.assetMgr.instantiate(floor);

            this._floorNodes.push(obj);

            obj.setWorldPosition(pos);
            obj.setParent(this.floorContainer, true); // rightBody.node.setParent(this.floorContainer, true)

            var rig = obj.getComponent(RigidBody);
            rig.setLinearVelocity(new Vec3(speed.x / 7, speed.y, 0));

            if (!this.DROP_DISTANCE) {
              var mesh = obj.getComponent(MeshRenderer);
              var modelCenter = mesh.model.modelBounds.halfExtents;
              var boxH = modelCenter.y * 2;
              var boxWHalf = modelCenter.x;
              this.DROP_DISTANCE = Math.sqrt(boxH * boxH + boxWHalf * boxWHalf) * this.dropScan;
            }

            var collider = obj.getComponent(Collider); // 监听触发事件
            // this.scheduleOnce(() => {

            collider.once("onCollisionEnter", this.onCollision, this); // }, 0.1)
          }
        }
        /**固定楼层 */


        frozenFloor(rightBody) {
          rightBody.type = ERigidBodyType.STATIC;
          rightBody.linearFactor = Vec3.ZERO;
          rightBody.angularFactor = Vec3.ZERO; // this.scheduleOnce(() => {
          // }, 2)
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
            var lastFloor = this._floorNodes[lenFloor - 1];
            var rightBody = lastFloor.getComponent(RigidBody);

            if (lenFloor > 1) {
              var preFloor = this._floorNodes[lenFloor - 2];
              var forceDir = lastFloor.worldPosition.x - preFloor.worldPosition.x;
              var dis = Vec3.distance(preFloor.worldPosition, lastFloor.worldPosition); //Math.abs(preFloor.worldPosition.x - lastFloor.worldPosition.x);

              if (forceDir > 0) {
                this._applyLastFloorForce.x = -dis;
              } else {
                this._applyLastFloorForce.x = dis;
              }

              console.log("距离：" + dis + ",最大距离差：" + this.DROP_DISTANCE);
              var offset = dis - this.DROP_DISTANCE;

              if (offset >= 0) {
                lastFloor.getComponent(Collider).isTrigger = true;
                rightBody.angularFactor = Vec3.ZERO;
                var offAngle = 10.0 + offset / this.DROP_DISTANCE * 35; // rightBody.linearFactor = Vec3.ONE

                var forcePos = new Vec3(0, 0, 0);

                if (preFloor.worldPosition.x < lastFloor.worldPosition.x) {
                  lastFloor.angle = -offAngle;
                  rightBody.setLinearVelocity(new Vec3(1, -2, 2)); // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, 50);

                  forcePos.x = 10;
                  console.log("往右掉下来");
                } else {
                  forcePos.x = -10;
                  lastFloor.angle = offAngle;
                  rightBody.setLinearVelocity(new Vec3(-1, -2, 2)); // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, -50);

                  console.log("往左掉下来");
                }

                this._failForcePos = forcePos;
                this._failFloor = rightBody;
                var mt = rightBody.getComponent(Collider).material;
                mt.friction = 0;
                mt.restitution = 0.1;
                mt.rollingFriction = 0;
                mt.spinningFriction = 0.5;
                this.scheduleOnce(() => {
                  this.removeFloor(lastFloor);
                  this.createNewBox();
                  this._failFloor = null;
                }, 2);
              } else {
                this.focuseLastFloorPos(lastFloor);
                this.frozenFloor(rightBody);
                var pos = lastFloor.position; //防止碰撞检测延时所以固定了Y

                lastFloor.setPosition(pos.x, preFloor.position.y + preFloor.getComponent(Collider).center.y * 2, pos.z);
                lastFloor.rotation = preFloor.rotation;

                if (this.checkIsPerfactPos(lastFloor.position.x, preFloor.position.x)) {
                  //完美命中
                  var lastPos = lastFloor.position;
                  lastFloor.setPosition(preFloor.position.x, lastPos.y, lastPos.z);
                  this.rockReduce();
                  console.log("完美命中");
                } else {
                  console.log("命中");

                  if (lenFloor > 3) {
                    this.rockHandler(forceDir);
                  } else {
                    this._floorOffset += forceDir;
                  }
                }

                if (lenFloor > 3 && this._isUseJerryState) {
                  lastFloor.getComponent(_crd && Mass === void 0 ? (_reportPossibleCrUseOfMass({
                    error: Error()
                  }), Mass) : Mass).enabled = true;
                  this._floorNodes[lenFloor - 4].getComponent(_crd && Mass === void 0 ? (_reportPossibleCrUseOfMass({
                    error: Error()
                  }), Mass) : Mass).enabled = false;
                }
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
        /**相机跟踪最后一块楼层 */


        focuseLastFloorPos(floor) {
          var wolrdPos = floor.getWorldPosition();
          wolrdPos.x = this.MAIN_CAMERA_POS.x;
          wolrdPos.z = this.MAIN_CAMERA_POS.z;
          wolrdPos.y += 1.8; // this.worldCamera.node.setWorldPosition(wolrdPos)

          tween(this.worldCamera.node).to(0.2, {
            worldPosition: wolrdPos
          }).start();
          var hitPos = this.hitArea.getWorldPosition();
          hitPos.y = wolrdPos.y - 3;
          this.hitArea.setWorldPosition(hitPos);
          this.createNewBox();
        }

        createNewBox() {
          // this.assetMgr.getRes("BaseBox", Prefab, "components").then(data => { this.createBox(data) })
          this.assetMgr.getRes("BoxFloor", Prefab, "components").then(data => {
            this.createFloorBox(data);
          });
        }

        createFloorBox(box) {
          if (box) {
            var obj = this.assetMgr.instantiate(box);

            if (obj) {
              var rig = obj.getComponent(RigidBody);
              rig.angularFactor = Vec3.ZERO;
              rig.mass = 0.0;
              this._dropBox = rig;
              var crane = find("crane");

              if (crane) {
                obj.setParent(crane);
                obj.layer = Layers.Enum.UI_3D;
              }

              obj.setWorldPosition(this.floorBornPos.worldPosition);
              var hc = this.cord.addComponent(HingeConstraint);
              hc.pivotA = new Vec3(0, -0.5, 0);
              var collider = obj.getComponent(BoxCollider);
              var centerB = collider.size;
              hc.pivotB = new Vec3(0, centerB.y, 0);
              hc.connectedBody = rig; // this.isMove = false;

              this._curTick = 0;
              this._isCanCreateNext = true; // boxRight2d.wakeUp();
            }
          }
        }

        onClickMainUI() {
          console.log("点击了");

          if (this._isCanCreateNext) {
            var dropFloor = this._dropBox.node;

            if (dropFloor) {
              var hc = this.cord.getComponent(HingeConstraint);
              hc.destroy();

              this._dropBox.getLinearVelocity(this.floorSpeed);

              this.assetMgr.removeInstant(dropFloor);
              this.floorSpeed.x *= 3;
              this.floorSpeed.y = -5;
              this.dropVec = this.cordCamera.worldToScreen(dropFloor.worldPosition);
              this.worldCamera.screenPointToRay(this.dropVec.x, this.dropVec.y, this.dropRay);
              this.onCheckHitFunc();
            }
          }
        }

        /**根据偏移值进行处理摇摆效果 */
        rockHandler(offset) {
          this._floorOffset += offset;
          var strResult = "";

          if (Math.abs(this._preOffSet) < Math.abs(offset) || this._targetContainerRo == 0) {
            this.rockAdd(offset);
            strResult = "加角度";
          } else {
            this.rockReduce();
            strResult = "减角度";
          }

          this._preOffSet = offset;
          console.log(strResult + "，Maxrotation：" + this._maxContainerRo + ",目标角度：" + this._targetContainerRo + "偏移值：" + this._floorOffset);
        }

        rockAdd(offset) {
          var rig = this.floorContainer.getComponent(RigidBody);
          this._floorContainerForce.x = offset * (1 / (this._floorNodes.length * this.floorRockRate)) * this.floorRockForce;
          this._forceContainerTime = 0;
          rig.linearDamping = 0;
        }

        rockReduce() {
          var rig = this.floorContainer.getComponent(RigidBody);
          var reduceRate = 1 - this.reduceRate;
          this._targetContainerRo = this._maxContainerRo * reduceRate;
          rig.linearDamping = this.floorRockDamping;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "assetMgr", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "baseBox", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "staticBody", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cordStatic", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cord", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "myGraph", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "uiGraph", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "mainUI", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "worldCamera", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "uiCamera", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "cordCamera", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "uiTransform", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "holder", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "hitArea", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "floorTemp", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "testNode", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "firstFloor", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "floorStatic", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "floorContainer", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "floorBornPos", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "reduceRate", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "floorRockRate", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "floorRockDamping", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "floorRockForce", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "dropScan", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=436b114cd6ce3d0d270683ba3c4de65c46946f50.js.map