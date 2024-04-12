import { _decorator, BoxCollider, BoxCollider2D, Camera, Canvas, cclegacy, Collider, Color, Component, director, DistanceJoint2D, EColliderType, ERigidBody2DType, ERigidBodyType, find, geometry, Graphics, HingeConstraint, HingeJoint2D, ICollisionEvent, Input, instantiate, Layers, Node, PhysicsSystem, PlaneCollider, PointToPointConstraint, Prefab, Quat, resources, RigidBody, RigidBody2D, Size, Sprite, tween, Tween, UITransform, Vec2, Vec3 } from 'cc';
import { AssetMgr } from './AssetMgr';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(AssetMgr)
    public assetMgr: AssetMgr;
    @property(RigidBody2D)
    public baseBox: RigidBody2D;
    @property(RigidBody2D)
    public staticBody: RigidBody2D;
    @property(RigidBody)
    public cordStatic: RigidBody;
    @property(RigidBody)
    public cord: RigidBody;
    @property(Graphics)
    public myGraph: Graphics;
    @property(Graphics)
    public uiGraph: Graphics;
    @property(Node)
    public mainUI: Node;
    @property(Camera)
    public worldCamera: Camera;
    @property(Camera)
    public uiCamera: Camera;
    @property(Camera)
    public cordCamera: Camera;
    @property(UITransform)
    public uiTransform: UITransform;
    @property(Node)
    public holder: Node;
    @property(Node)
    public hitArea: Node;
    @property(Node)
    public floorTemp: Node;
    @property(Node)
    public testNode: Node;
    @property(Node)
    public firstFloor: Node;
    @property(Node)
    public floorStatic: Node;
    @property(Node)
    public floorContainer: Node;
    @property(Node)
    public floorBornPos: Node;
    @property({ displayName: "命中衰减振幅系数" })
    /**命中衰减振幅系数 */
    public reduceRate = 0.1;
    @property({ displayName: "楼层高度振幅系数" })
    /**楼层高度振幅系数 */
    public floorRockRate = 0.2;
    @property({ displayName: "振幅衰减阻尼系数" })
    /**振幅衰减阻尼系数 */
    public floorRockDamping = 0.5;
    /**振幅系数 */
    @property({ displayName: "振幅系数" })
    public floorRockForce = 1;
    protected dj2d: DistanceJoint2D;
    protected beRotateObj: RigidBody2D
    private scanAngle: Vec3;
    private _moveDir: number = 50;
    private readonly distance = 300;
    // private localCenter: Vec2;
    private forceVec: Vec2;
    private _curTick = 0;
    private readonly disForceTime = 2;
    private readonly MaxAngle = 30;
    private readonly DOWN_DIR = new Vec3(0, -1, 0)
    /**掉落判断偏移值 */
    private DROP_DISTANCE: number;
    private readonly HOLDER_BASE_POS = new Vec3(0, 700, 0)
    private readonly MAIN_CAMERA_POS = new Vec3(0, 3, 16)
    private readonly FORCE_CONTAINER_TIME = 1;
    // public MAX_DISTANCE: number;
    private HOLDER_DIS_POS_Y: number;
    private isMove = false;
    private myPosBegin: Vec3;
    private myTargetPoint: Vec3;
    private dropRay: geometry.Ray
    private floorSpeed: Vec3;
    private dropVec: Vec3;
    private _floorNodes: Node[];
    private _isCanCreateNext: boolean = true;
    private _failFloor: RigidBody;
    private _failForcePos: Vec3;
    private _floorContainerGav = new Vec3(0, 20, 0)
    private _forceContainerTime = 0;
    private _floorContainerForce = new Vec3(1, 0, 0)
    private _gavVec = new Vec3(0, -10, 0)
    private _applyLastFloorForce = new Vec3(0.2, 0, 0)
    private _connectFloors: RigidBody[] = [];
    private _maxContainerRo: number = 0;
    private _targetContainerRo = 0;
    private _floorOffset = 0;
    private _dropBox: RigidBody;
    start() {
        this.assetMgr.preLoadBundles().then(this.createNewBox.bind(this));
        // PhysicsSystem.instance.restitution=
        if (this.staticBody) {
            var distance2D = this.staticBody.getComponent(DistanceJoint2D)
            this.dj2d = distance2D;
            this.forceVec = new Vec2(this._moveDir, 0);
            this.myGraph.lineWidth = 10;
            this.myGraph.lineCap = Graphics.LineCap.ROUND;
            this.myGraph.strokeColor = Color.BLUE;
            this.myPosBegin = new Vec3();
            this.myTargetPoint = new Vec3();
            this.dropRay = new geometry.Ray
            this._floorNodes = [];
            this.holder.setPosition(this.HOLDER_BASE_POS);
            this.worldCamera.node.setPosition(this.MAIN_CAMERA_POS)
            var floorCollider = this.floorTemp.getComponent(PlaneCollider)
            floorCollider.material.restitution = 0;
            floorCollider.sharedMaterial.restitution = 0;
            this.floorSpeed = new Vec3();
            this.dropVec = new Vec3();
            // this.floorContainer.getComponent(RigidBody).applyLocalTorque(new Vec3(0, 0, 100))
            // let tweenDuration: number = 2.0;
            // let angle = 2;


            // let embedTween = tween(this.floorTemp).to(tweenDuration, { eulerAngles: new Vec3(0, 0, angle * 2) }, { easing: "cubicOut" }).to(tweenDuration, { eulerAngles: new Vec3(0, 0, -angle * 2) }, { easing: "cubicOut" }).union();



            // tween(this.floorTemp).to(tweenDuration / 2, { eulerAngles: new Vec3(0, 0, -angle) }, { easing: "cubicOut" }).call(() => {
            //     embedTween.repeatForever().start();
            // }).start();
        }
        this.mainUI.on(Input.EventType.TOUCH_START, this.onClickMainUI, this)
    }

    update(deltaTime: number) {




        this._curTick += deltaTime;

        if (!this.isMove) {
            this.cord.applyForce(new Vec3(5, 0, 0));
            // this.baseBox.applyForceToCenter(this.forceVec, true);
            if (this._curTick > this.disForceTime) {

                this.isMove = true;
            }
        }

        if (this.cordStatic) {

        }
        if (this._failFloor) {

            this._failFloor.applyForce(this._failForcePos)
        }
        this._forceContainerTime += deltaTime
        let containerRig = this.floorContainer.getComponent(RigidBody);
        if (this._floorOffset > 0 && this._forceContainerTime < this.FORCE_CONTAINER_TIME) {

            containerRig.applyForce(this._floorContainerForce)
        }
        containerRig.applyForce(this._floorContainerGav)

        let ro = Math.abs(this.floorContainer.eulerAngles.z);
        let vecRo: Vec3 = new Vec3;
        containerRig.getLinearVelocity(vecRo)
        if (Math.abs(vecRo.x) <= 0.01) {
            this._maxContainerRo = ro;
        }
        if (this._maxContainerRo <= this._targetContainerRo && this._targetContainerRo > 0) {
            containerRig.linearDamping = 0;
        }


    }
    onCheckHitFunc() {
        const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = true;

        if (PhysicsSystem.instance.raycast(this.dropRay)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            raycastResults.forEach(rayRes => {
                const collider = rayRes.collider;
                if (raycastResults && collider.node.uuid == this.hitArea.uuid) {
                    const hitPoint = rayRes.hitPoint
                    this.createFloor(hitPoint, this.floorSpeed)

                }
            })
        }
    }
    createFloor(pos: Vec3, speed: Vec3) {
        this.assetMgr.getRes("BoxFloor", Prefab, "components").then(data => {
            this.initFloor(data, pos, speed)
        })
    }
    initFloor(floor: Prefab, pos: Vec3, speed: Vec3) {
        if (floor) {
            var obj = this.assetMgr.instantiate(floor);
            this._floorNodes.push(obj);
            obj.setWorldPosition(pos);
            obj.setParent(this.floorContainer, true)
            // rightBody.node.setParent(this.floorContainer, true)
            var rig = obj.getComponent(RigidBody)
            rig.setLinearVelocity(new Vec3(speed.x / 7, speed.y, 0))
            if (!this.DROP_DISTANCE) {
                var boxW = obj.scale.x;
                var boxH = obj.scale.y;
                var boxWHalf = boxW / 2;
                this.DROP_DISTANCE = Math.sqrt(boxH * boxH + boxWHalf * boxWHalf)
            }
            let collider = obj.getComponent(Collider);
            // 监听触发事件
            this.scheduleOnce(() => {
                collider.once("onCollisionEnter", this.onCollision, this);
            }, 0.2)
        }

    }

    /**固定楼层 */
    private frozenFloor(rightBody: RigidBody): void {

        rightBody.type = ERigidBodyType.STATIC;
        rightBody.linearFactor = Vec3.ZERO
        rightBody.angularFactor = Vec3.ZERO
        // this.scheduleOnce(() => {


        // }, 2)
    }
    private connectFloor(floor: Node, preFoor: Node): void {
        var ppc = preFoor.addComponent(PointToPointConstraint)
        var rig = floor.getComponent(RigidBody);
        rig.useGravity = false;
        ppc.connectedBody = rig
        ppc.pivotA = new Vec3(floor.worldPosition.x - preFoor.worldPosition.x, 1, 0)
        this._connectFloors.push(rig)
    }
    removeFloor(floor: Node) {
        this.assetMgr.removeInstant(floor)
        var index = this._floorNodes.indexOf(floor)
        this._floorNodes.splice(index, 1)
    }
    onCollision(event: ICollisionEvent) {
        var lenFloor = this._floorNodes.length
        if (lenFloor > 0) {
            var lastFloor = this._floorNodes[lenFloor - 1];

            var rightBody = lastFloor.getComponent(RigidBody);
            var boxCollider = rightBody.getComponent(BoxCollider)


            if (lenFloor > 1) {
                var preFloor = this._floorNodes[lenFloor - 2];
                var forceDir = lastFloor.worldPosition.x - preFloor.worldPosition.x;

                var dis = Vec3.distance(preFloor.worldPosition, lastFloor.worldPosition)//Math.abs(preFloor.worldPosition.x - lastFloor.worldPosition.x);

                if (forceDir > 0) {

                    this._applyLastFloorForce.x = -dis;
                } else {

                    this._applyLastFloorForce.x = dis;
                }

                console.log("距离：" + dis + ",最大距离差：" + this.DROP_DISTANCE)
                if (dis >= this.DROP_DISTANCE) {
                    rightBody.angularFactor = Vec3.ONE

                    var forcePos = new Vec3(0, 0, 0);
                    if (preFloor.worldPosition.x < lastFloor.worldPosition.x) {
                        forcePos.x = 10;
                        console.log("往右掉下来")
                    } else {
                        forcePos.x = -10;
                        console.log("往左掉下来")
                    }
                    this._failForcePos = forcePos;
                    this._failFloor = rightBody;
                    this.scheduleOnce(() => {
                        this.removeFloor(lastFloor)
                        this.createNewBox();
                        this._failFloor = null;
                    }, 2)
                } else {
                    this.focuseLastFloorPos(lastFloor)

                    this.frozenFloor(rightBody)

                    if (this.checkIsPerfactPos(lastFloor.position.x, preFloor.position.x)) {//完美命中
                        var lastPos = lastFloor.position;
                        lastFloor.setPosition(preFloor.position.x, lastPos.y, lastPos.z)
                        this.rockReduce();
                        console.log("完美命中")
                    } else {
                        if (lenFloor > 3) {
                            this.rockHandler(forceDir);
                        } else {
                            this._floorOffset += forceDir;
                        }
                    }
                    rightBody.node.rotation = preFloor.rotation
                }
            } else {
                this.focuseLastFloorPos(lastFloor)
                this.frozenFloor(rightBody)
            }
        }
    }
    checkIsPerfactPos(matchX: number, targetX: number) {
        return Math.abs(matchX - targetX) < 0.05
    }
    /**相机跟踪最后一块楼层 */
    focuseLastFloorPos(floor: Node) {
        var wolrdPos = floor.getWorldPosition();
        wolrdPos.x = this.MAIN_CAMERA_POS.x;
        wolrdPos.z = this.MAIN_CAMERA_POS.z;
        wolrdPos.y += 1.8;
        // this.worldCamera.node.setWorldPosition(wolrdPos)
        tween(this.worldCamera.node).to(0.2, { worldPosition: wolrdPos }).start();
        var hitPos = this.hitArea.getWorldPosition();
        hitPos.y = wolrdPos.y - 3
        this.hitArea.setWorldPosition(hitPos)

        this.createNewBox();

    }
    createNewBox() {
        // this.assetMgr.getRes("BaseBox", Prefab, "components").then(data => { this.createBox(data) })
        this.assetMgr.getRes("BoxFloor", Prefab, "components").then(data => { this.createFloorBox(data) })
    }
    createFloorBox(box: Prefab) {
        if (box) {
            var obj = this.assetMgr.instantiate(box);
            if (obj) {

                var rig = obj.getComponent(RigidBody);
                rig.angularFactor = Vec3.ZERO;
                rig.mass = 0;
                this._dropBox = rig;
                var crane = find("crane")
                if (crane) {
                    obj.setParent(crane)
                    obj.layer = Layers.Enum.UI_3D;
                }

                obj.setWorldPosition(this.floorBornPos.worldPosition)

                var hc = this.cord.addComponent(HingeConstraint)
                hc.pivotA = new Vec3(0, -0.5, 0);
                hc.pivotB = new Vec3(0, 0.5, 0);

                hc.connectedBody = rig

                // this.isMove = false;
                this._curTick = 0;
                this._isCanCreateNext = true;
                // boxRight2d.wakeUp();
            }
        }
    }

    onClickMainUI() {
        console.log("点击了")

        if (this._isCanCreateNext) {
            var dropFloor = this._dropBox.node
            if (dropFloor) {

                var hc = this.cord.getComponent(HingeConstraint)
                hc.destroy();

                this._dropBox.getLinearVelocity(this.floorSpeed)
                this.assetMgr.removeInstant(dropFloor);
                this.floorSpeed.x *= 3
                this.floorSpeed.y = -5;

                this.dropVec = this.cordCamera.worldToScreen(dropFloor.worldPosition)

                this.worldCamera.screenPointToRay(this.dropVec.x, this.dropVec.y, this.dropRay)
                this.onCheckHitFunc();
            }
        }
    }
    private _preOffSet = 0;
    /**根据偏移值进行处理摇摆效果 */
    rockHandler(offset: number) {
        this._floorOffset += offset;
        var strResult = ""
        if (Math.abs(this._preOffSet) < Math.abs(offset) || this._targetContainerRo == 0) {
            this.rockAdd(offset);
            strResult = "加角度"
        } else {
            this.rockReduce();
            strResult = "减角度"
        }
        this._preOffSet = offset;
        console.log(strResult + "，Maxrotation：" + this._maxContainerRo + ",目标角度：" + this._targetContainerRo + "偏移值：" + this._floorOffset);
    }
    rockAdd(offset: number) {
        var rig = this.floorContainer.getComponent(RigidBody)
        this._floorContainerForce.x = offset * (1 / (this._floorNodes.length * this.floorRockRate)) * this.floorRockForce
        this._forceContainerTime = 0;
        rig.linearDamping = 0;
    }
    rockReduce() {
        var rig = this.floorContainer.getComponent(RigidBody)
        let reduceRate = 1 - this.reduceRate
        this._targetContainerRo = this._maxContainerRo * reduceRate
        rig.linearDamping = this.floorRockDamping;
    }
}

