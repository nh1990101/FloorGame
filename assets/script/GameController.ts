import { _decorator, BoxCollider, BoxCollider2D, Camera, Canvas, cclegacy, Collider, Color, Component, director, DistanceJoint2D, EColliderType, ERigidBody2DType, ERigidBodyType, find, geometry, Graphics, HingeConstraint, HingeJoint2D, ICollisionEvent, Input, instantiate, Layers, lerp, MeshRenderer, Node, PhysicsSystem, PlaneCollider, PointToPointConstraint, Prefab, Quat, resources, RigidBody, RigidBody2D, Scheduler, Size, Sprite, tween, Tween, UITransform, Vec2, Vec3 } from 'cc';
import { AssetMgr } from './AssetMgr';
import { Mass } from './Mass';
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
 
    @property({ displayName: "命中准确系数" })
    /**命中准确系数 */
    public dropScan = 1.0;

    /**最大锤摆角 */
    public maxRockRotation = 0.0;
    protected dj2d: DistanceJoint2D;
    protected beRotateObj: RigidBody2D
    private scanAngle: Vec3;
    private _moveDir: number = 50;
    private readonly distance = 300;
    // private localCenter: Vec2;
    private forceVec: Vec2;
    private _curTick = 0;
    private readonly disForceTime = 2;

    private readonly DOWN_DIR = new Vec3(0, -1, 0)
    /**掉落判断偏移值 */
    private DROP_DISTANCE: number;
    private readonly HOLDER_BASE_POS = new Vec3(0, 700, 0)
    private readonly MAIN_CAMERA_POS = new Vec3(0, 3, 10)
    private readonly FORCE_CONTAINER_TIME = 1;
    // public MAX_DISTANCE: number;
    private HOLDER_DIS_POS_Y: number;
 
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
    private _isUseJerryState: boolean;
   
    private _roVec: Vec3;
    private roTime = 0;
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
            this._roVec = new Vec3();
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
        this.roTime += deltaTime;
  
        if (this.cordStatic) {

        }
    
       
        let containerRig = this.floorContainer.getComponent(RigidBody);
       
        containerRig.node.angle = Math.sin(this.roTime * 2) * this.maxRockRotation;



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
                var mesh = obj.getComponent(MeshRenderer)
                var modelCenter = mesh.model.modelBounds.halfExtents;
                var boxH = modelCenter.y * 2;
                var boxWHalf = modelCenter.x;
                this.DROP_DISTANCE = Math.sqrt(boxH * boxH + boxWHalf * boxWHalf) * this.dropScan
            }
            let collider = obj.getComponent(Collider);
            // 监听触发事件
            // this.scheduleOnce(() => {
            collider.once("onCollisionEnter", this.onCollision, this);
            // }, 0.1)
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
                var offset = dis - this.DROP_DISTANCE
                if (offset >= 0) {
                    lastFloor.getComponent(Collider).isTrigger = true;
                    rightBody.angularFactor = Vec3.ZERO
                    var offAngle = (10.0 + (offset / this.DROP_DISTANCE) * 35);
                    // rightBody.linearFactor = Vec3.ONE
                    var forcePos = new Vec3(0, 0, 0);
                    if (preFloor.worldPosition.x < lastFloor.worldPosition.x) {
                        lastFloor.angle = -offAngle;
                        rightBody.setLinearVelocity(new Vec3(1, -2, 2))
                        // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, 50);
                        forcePos.x = 10;
                        console.log("往右掉下来")
                    } else {
                        forcePos.x = -10;
                        lastFloor.angle = offAngle
                        rightBody.setLinearVelocity(new Vec3(-1, -2, 2))
                        // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, -50);
                        console.log("往左掉下来")
                    }
                    this._failForcePos = forcePos;
                    this._failFloor = rightBody;
                    var mt = rightBody.getComponent(Collider).material;
                    mt.friction = 0;
                    mt.restitution = 0.1;
                    mt.rollingFriction = 0;
                    mt.spinningFriction = 0.5;
                    this.scheduleOnce(() => {
                        this.removeFloor(lastFloor)
                        this.createNewBox();
                        this._failFloor = null;
                    }, 2)
                } else {

                    this.focuseLastFloorPos(lastFloor)

                    this.frozenFloor(rightBody)
                    var pos = lastFloor.position;
                    //防止碰撞检测延时所以固定了Y
                    lastFloor.setPosition(pos.x, preFloor.position.y + preFloor.getComponent(Collider).center.y * 2, pos.z)
                    lastFloor.rotation = preFloor.rotation;

                    if (this.checkIsPerfactPos(lastFloor.position.x, preFloor.position.x)) {//完美命中
                        var lastPos = lastFloor.position;
                        lastFloor.setPosition(preFloor.position.x, lastPos.y, lastPos.z)
                        console.log("完美命中")
                    } else {
                        console.log("命中")
                        if (lenFloor > 3) {
                            this.rockHandler(forceDir);

                        } else {
                            this._floorOffset += forceDir;
                        }
                    }
                    if (lenFloor > 3 && this._isUseJerryState) {
                        lastFloor.getComponent(Mass).enabled = true;
                        this._floorNodes[lenFloor - 4].getComponent(Mass).enabled = false;
                    }
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
                rig.mass = 0.0;
                this._dropBox = rig;
                var crane = find("crane")
                if (crane) {
                    obj.setParent(crane)
                    obj.layer = Layers.Enum.UI_3D;

                }

                obj.setWorldPosition(this.floorBornPos.worldPosition)

                var hc = this.cord.addComponent(HingeConstraint)
                hc.pivotA = new Vec3(0, -0.5, 0);
                var collider = obj.getComponent(BoxCollider);
                var centerB = collider.size
                hc.pivotB = new Vec3(0, centerB.y, 0);

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

    /**根据偏移值进行处理摇摆效果 */
    rockHandler(offset: number) {
        this._floorOffset += Math.abs(offset)*3;
      
        this.maxRockRotation = Math.atan(this._floorOffset / this._floorNodes[this._floorNodes.length - 1].position.y);
    }
  
  
}

