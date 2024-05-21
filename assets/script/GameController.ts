import { _decorator, BoxCollider, BoxCollider2D, Camera, Canvas, cclegacy, Collider, Color, Component, debug, DebugMode, director, DistanceJoint2D, EColliderType, ERigidBody2DType, ERigidBodyType, EventTouch, find, geometry, Graphics, HingeConstraint, HingeJoint2D, ICollisionEvent, Input, instantiate, Layers, lerp, MeshRenderer, Node, PhysicsSystem, PlaneCollider, PointToPointConstraint, Prefab, profiler, Quat, resources, RigidBody, RigidBody2D, SceneGlobals, Scheduler, Size, Sprite, tween, Tween, UITransform, Vec2, Vec3 } from 'cc';
import { AssetMgr } from './AssetMgr';
import { Mass } from './Mass';
import { MainUI } from './MainUI';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(AssetMgr)
    public assetMgr: AssetMgr;
    @property(Node)
    public skyBox: Node;
    @property(Node)
    public skyBox2: Node;
    @property(MainUI)
    public mainUI: MainUI;
    @property(Camera)
    public worldCamera: Camera;
    @property(Node)
    public craneGrowTemp: Node;
    @property(Node)
    public holderRock: Node;
    @property(Node)
    public holderLine: Node;
    @property(Node)
    public holderCarry: Node;
    @property(Node)
    public lineEndPoint: Node;
    @property(Node)
    public holderTemp: Node;
    @property(Node)
    public craneHolder: Node;
    @property(Node)
    public floorTemp: Node;
    @property(Node)
    public floorContainer: Node;
    @property(Node)
    public floorBornPos: Node;
    @property(Node)
    public hold: Node;
    @property({ displayName: "命中准确系数" })
    /**命中准确系数 */
    public dropScan = 1;
    @property({ displayName: "锤摆最大角度" })
    /**锤摆最大角度 */
    public rockMaxAngle = 15.0;
    @property({ displayName: "吊绳水平摇摆最大距离" })
    /**吊绳水平摇摆最大距离 */
    public craneMoveMaxX = 0.0001;
    @property({ displayName: "吊绳缩放比" })
    /**吊绳垂直摇摆最大距离 */
    public craneMoveMaxY = 0.3;
    /**高楼最大锤摆角 */
    public maxRockRotation = 0.0;
    /**掉落判断偏移值 */
    private dropDistance: number;
    private floorContainerRockFrequency: number = 1;
    private floorRockTick: number = 0;
    private sky1Height: number;
    private sky2Height: number;


    private readonly MAIN_CAMERA_POS = new Vec3(0, 3, 14)
    private readonly TOUCH_AROUND_TIME = 1.0;
    private craneGrows: Node[];
    private floorSpeed: Vec3;
    private _floorNodes: Node[];
    private _isCanCreateNext: boolean = true;

    private _connectFloors: RigidBody[] = [];

    private _floorOffNum = 0;
    private _floorOffset = 0;
    private _dropBox: RigidBody;
    private _isUseJerryState: boolean = false;
    private _dropBoxPos: Vec3;
    private _holderEurAngle: Vec3;
    private _holderPos: Vec3;
    private _holderLineScale: Vec3;
    private _holderLineOldScale: Vec3;


    private roTime = 0;


    private touchTime: number = -1;
    private beginTouchPos: Vec2;
    private mouseMovePos: Vec2;
    private cameraMoveVec: Vec2;
    private isWatchState: boolean;
    private floorFirstName: string = "floor_1_0"
    private floorName: string = "floor_1_1";
    private watchPos: Vec3;
    private lerpTime = 0;
    /**获取最后一层楼高度 */
    public get floorHeight(): number {
        var len = this._floorNodes.length
        var floorNode: Node;
        if (len > 1) {
            floorNode = this._floorNodes[len - 2];
        } else if (len > 0) {
            floorNode = this.getLastFloor();
        } else {
            return 0;
        }
        return this.getMeshSize(floorNode).y * 2
    }
    start() {
        this.assetMgr.preLoadBundles().then(this.createNewBox.bind(this));

        profiler.hideStats();
        this._floorNodes = [];

        this.worldCamera.node.setPosition(this.MAIN_CAMERA_POS)
        var floorCollider = this.floorTemp.getComponent(PlaneCollider)
        floorCollider.material.restitution = 0;
        floorCollider.sharedMaterial.restitution = 0;
        this.floorSpeed = new Vec3();
        this._holderEurAngle = new Vec3();

        this.craneGrows = [];
        this.mainUI.node.on(Input.EventType.TOUCH_END, this.onClickMainUI, this)
        this.mainUI.node.on(Input.EventType.TOUCH_START, this.onClickStart, this)
        this.mainUI.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this._holderPos = this.holderRock.getPosition();
        this._holderLineOldScale = this.holderLine.getWorldScale().clone();
        this._holderLineScale = this._holderLineOldScale.clone();
    }

    update(deltaTime: number) {

        this.roTime += deltaTime;
        this.floorRockTick += deltaTime;
        if (this.touchTime >= 0) {
            this.touchTime += deltaTime;
        }
        if (this.touchTime >= this.TOUCH_AROUND_TIME) {
            this.isWatchState = true;
            var pos = this.getLastFloor().getWorldPosition()
            this.watchPos = new Vec3(pos.x, pos.y, pos.z)
        }


        this.floorContainer.angle = Math.sin(this.floorRockTick * this.floorContainerRockFrequency) * this.maxRockRotation;
        this._holderEurAngle.x = Math.sin(this.roTime * 2) * this.rockMaxAngle;
        this.holderRock.eulerAngles = this._holderEurAngle;
        this._holderPos.z += this.craneMoveMaxX * Math.sin(this.roTime * 2)

        this._holderLineScale.y = this._holderLineOldScale.y + this.craneMoveMaxY * this._holderLineOldScale.y * Math.cos(this.roTime * 2)//(1 + this.craneMoveMaxY * Math.sin(this.roTime * 2));
        this.holderLine.setWorldScale(this._holderLineScale)
        this.holderRock.setPosition(this._holderPos)
        this.holderCarry.setWorldPosition(this.lineEndPoint.getWorldPosition())
        if (this._isCanCreateNext && this._dropBox && this._dropBox.node && this._dropBox.node.parent == this.holderTemp) {

            if (this._dropBoxPos) {

                Vec3.subtract(this._dropBoxPos, this._dropBox.node.worldPosition, this._dropBoxPos)
                // if (this._dropBoxPos.y < 0) {//防止上一帧dropBox已经掉落导致位置问题

                Vec3.multiplyScalar(this.floorSpeed, this._dropBoxPos, 1 / deltaTime)
                this.floorSpeed.x *= 3
                this.floorSpeed.y = -10;

                // }
            }
            this._dropBoxPos = this._dropBox.node.worldPosition.clone();

        }
    }

    initFloorData(obj: Node, pos: Vec3, speed: Vec3) {
        var preFloor = this.getLastFloor();
        if (!preFloor) {
            preFloor = obj;
        }
        this._floorNodes.push(obj);
        obj.setParent(this.node, true)


        var rig = obj.getComponent(RigidBody)
        rig.angularFactor = Vec3.UNIT_Z;
        rig.getComponent(Collider).isTrigger = false;
        rig.useGravity = true;
        rig.setLinearVelocity(new Vec3(speed.x / 7, speed.y, 0))

        let collider = obj.getComponent(Collider);

        // 监听触发事件
        collider.once("onCollisionEnter", this.onEnterCollision, this);

    }
    private onEnterCollision(event: ICollisionEvent) {
        var lastFloor = this.getLastFloor();
        lastFloor.setParent(this.floorContainer, true)
        lastFloor.eulerAngles = Vec3.ZERO;
        this.onCollision(event)
        // tween(lastFloor).to(0.1, { eulerAngles: Vec3.ZERO }).call(this.onCollision.bind(this)).start();
    }
    private getFloorName(): string {
        if (this._floorNodes.length < 1) {
            return this.floorFirstName;
        }
        return this.floorName;
    }
    /**固定楼层 */
    private frozenFloor(rightBody: RigidBody): void {

        rightBody.type = ERigidBodyType.STATIC;
        rightBody.linearFactor = Vec3.ZERO
        rightBody.angularFactor = Vec3.ZERO

        // rightBody.node.eulerAngles = Vec3.ZERO;
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
            var lastFloor = this.getLastFloor();


            var rightBody = lastFloor.getComponent(RigidBody);

            if (lenFloor > 1) {
                var preFloor = this._floorNodes[lenFloor - 2];
                var forceDir = lastFloor.worldPosition.x - preFloor.worldPosition.x;
                var lastFloorMeshSize = this.getMeshSize(lastFloor)
                var boxH = lastFloorMeshSize.y + this.floorHeight * 0.5
                var boxWHalf = lastFloorMeshSize.x;
                var dis = Vec3.distance(preFloor.position, lastFloor.position)//Math.abs(preFloor.worldPosition.x - lastFloor.worldPosition.x);
                this.dropDistance = Math.sqrt(boxH * boxH + boxWHalf * boxWHalf) * this.dropScan;
                console.log("距离：" + dis + ",最大距离差：" + this.dropDistance)
                var offset = dis - this.dropDistance
                if (offset >= 0) {
                    lastFloor.getComponent(Collider).isTrigger = true;
                    rightBody.clearState();// = Vec3.ZERO
                    rightBody.angularFactor = Vec3.ZERO
                    lastFloor.setParent(this.node, true)
                    var offAngle = (10.0 + (offset / this.dropDistance) * 90);
                    // rightBody.linearFactor = Vec3.ONE
                    // var forcePos = new Vec3(0, 0, 0);
                    var targetAngle: number;
                    if (preFloor.worldPosition.x < lastFloor.worldPosition.x) {
                        targetAngle = -offAngle;
                        rightBody.setLinearVelocity(new Vec3(1, -9, 5))
                        // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, 50);
                        // forcePos.x = 10;
                        console.log("往右掉下来")
                    } else {
                        // forcePos.x = -10;
                        targetAngle = offAngle
                        rightBody.setLinearVelocity(new Vec3(-1, -9, 5))
                        // Vec3.multiplyScalar(rightBody.linearFactor, Vec3.UNIT_X, -50);
                        console.log("往左掉下来")
                    }
                    tween(lastFloor).to(0.5, { angle: targetAngle }).start();
                    this.scheduleOnce(() => {
                        this.removeFloor(lastFloor)
                        this.createNewBox();
                        this.canCreateFunc();
                    }, 1)
                } else {

                    this.frozenFloor(rightBody)
                    var pos = lastFloor.position;
                    //防止碰撞检测延时所以固定了Y

                    lastFloor.setPosition(pos.x, preFloor.position.y + this.floorHeight, pos.z)
                    lastFloor.rotation = preFloor.rotation;

                    if (this.checkIsPerfactPos(lastFloor.position.x, preFloor.position.x)) {//完美命中
                        var lastPos = lastFloor.position;
                        lastFloor.setPosition(preFloor.position.x, lastPos.y, lastPos.z)
                        console.log("完美命中")
                        this.rockHandler(0);
                    } else {
                        console.log("命中")
                        this.rockHandler(forceDir);
                    }

                    this.focuseLastFloorPos(lastFloor)
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
    getMeshSize(node: Node, scaleVec: Vec3 = Vec3.ONE): Vec3 {
        let mesh = node.getComponent(MeshRenderer)
        if (mesh) {
            var modelHalf = mesh.model.modelBounds.halfExtents.clone();
            modelHalf.multiply(node.getWorldScale());//*= node.scale.y;
            modelHalf.multiply(scaleVec);
            return modelHalf;
        }
    }
    createCraneGrow() {
        this.assetMgr.getRes("CraneGrow", Prefab, "components").then(data => {
            var obj = this.assetMgr.instantiate(data);
            obj.setParent(this.craneGrowTemp)
            var modelSize = this.getMeshSize(obj);
            var scale = this.floorHeight / (modelSize.z * 2);
            obj.setScale(obj.scale.x, obj.scale.y, scale);
            var pos = obj.getWorldPosition();
            this.craneGrows.push(obj);
            pos.y = obj.parent.worldPosition.y + (this.craneGrows.length - 1) * this.floorHeight;
            obj.setWorldPosition(pos)
            // obj.setWorldPosition(pos.x, pos.y + (this.craneGrows.length) * this.floorHeight , pos.z);
            var targetPos = new Vec3(pos.x, pos.y + this.floorHeight, pos.z)
            tween(obj).to(0.2, { worldPosition: targetPos }).start();
        })
    }
    private canCreateFunc() {
        this._isCanCreateNext = true;
    }
    resetCameraPos(floor: Node, during = 0.2) {
        var wolrdPos = floor.getWorldPosition();
        wolrdPos.x = this.MAIN_CAMERA_POS.x;
        wolrdPos.z = this.MAIN_CAMERA_POS.z;
        wolrdPos.y += 1.8;
        return tween(this.worldCamera.node).to(during, { worldPosition: wolrdPos, eulerAngles: Vec3.ZERO })
    }
    /**相机跟踪最后一块楼层 */
    focuseLastFloorPos(floor: Node) {
        this.createCraneGrow();

        var wolrdPos = floor.getWorldPosition();
        wolrdPos.x = this.MAIN_CAMERA_POS.x;
        wolrdPos.z = this.MAIN_CAMERA_POS.z;
        wolrdPos.y += 1.8;

        this.resetCameraPos(floor).call(this.canCreateFunc.bind(this)).start();
        // this.worldCamera.node.lookAt(floor.getWorldPosition())
        var cranePos = this.craneHolder.getWorldPosition();
        cranePos.y += this.floorHeight;
        tween(this.craneHolder).to(0.2, { worldPosition: cranePos }).start();
        // this.craneHolder.setWorldPosition(cranePos)
        // this.createNewBox();
        if (!this.sky1Height) {
            let modelCenter = this.getMeshSize(this.skyBox)
            this.sky1Height = modelCenter.y
        }
        if (!this.sky2Height) {
            let modelCenter = this.getMeshSize(this.skyBox2)
            this.sky2Height = modelCenter.y
        }
        var numFloor = this._floorNodes.length;
        this.mainUI.setFloorNum(numFloor);
        //天空1处理
        var rate = this.floorHeight / this.sky1Height;
        var alpha = numFloor * rate;
        this.changeSkyBoxAlpha(this.skyBox, 1 - alpha, false)

        //天空2处理
        if (alpha >= 1) {//已冲破第一层天空
            var rate2 = this.floorHeight / (this.sky2Height - this.sky1Height);
            alpha = (numFloor - (1 / rate)) * rate2
            this.changeSkyBoxAlpha(this.skyBox2, 1 - alpha, false)
        } else {//还在第一层
            // this.changeSkyBoxAlpha(this.skyBox2, 0, true)
        }
        this.createNewBox();
    }

    createNewBox() {
        // this.assetMgr.getRes("BaseBox", Prefab, "components").then(data => { this.createBox(data) })
        this._dropBoxPos = null;
        this.assetMgr.getRes(this.getFloorName(), Prefab, "components").then(data => { this.createFloorBox(data) })
    }
    createFloorBox(box: Prefab) {
        if (box) {
            var obj = this.assetMgr.instantiate(box);
            if (obj) {

                var rig = obj.getComponent(RigidBody);
                rig.angularFactor = Vec3.ZERO;
                rig.getComponent(Collider).isTrigger = true;
                rig.useGravity = false;
                this._dropBox = rig;

                obj.setParent(this.holderTemp)
            }
        }
    }
    getLastFloor(): Node {
        var len = this._floorNodes.length
        if (this._floorNodes.length > 0) {
            return this._floorNodes[len - 1];
        }
        return null;
    }
    onClickMainUI() {
        this.touchTime = -1;
        if (this.isWatchState) {
            this.isWatchState = false;
            console.log("结束观看")
            this.resetCameraPos(this.getLastFloor(), 1.0).start();
            return;
        }
        console.log("点击了")
        if (this._isCanCreateNext) {
            var dropFloor = this._dropBox.node
            if (dropFloor) {
                this._isCanCreateNext = false;
                this.initFloorData(dropFloor, dropFloor.worldPosition, this.floorSpeed)
            }
        }
    }
    onClickStart(e: EventTouch) {
        this.touchTime = 0
        this.beginTouchPos = e.getLocation();
    }
    onTouchMove(e: EventTouch) {
        if (!this.isWatchState) {
            return;
        }
        this.mouseMovePos = e.getLocation();
        if (!this.cameraMoveVec) {
            this.cameraMoveVec = new Vec2();
        }
        if (this._floorNodes.length > 0) {
            Vec2.subtract(this.cameraMoveVec, this.beginTouchPos, this.mouseMovePos);
            this.cameraMoveVec.multiplyScalar(0.05);
            // if (this.cameraMoveVec.y < 0) {
            //     this.cameraMoveVec.y = 0;
            // }
            var centerVec = this.watchPos.clone();
            var R = this.MAIN_CAMERA_POS.z

            var value = R * R - this.cameraMoveVec.x * this.cameraMoveVec.x - this.cameraMoveVec.y * this.cameraMoveVec.y;
            var dir = value >= 0 ? 1 : -1;
            var absValue = Math.abs(value)

            var zValue = Math.sqrt(absValue) * dir

            var targetPos = new Vec3(this.cameraMoveVec.x, this.cameraMoveVec.y + centerVec.y + 1.8, zValue)

            this.worldCamera.node.setWorldPosition(targetPos);
            centerVec.y += 1.8
            this.worldCamera.node.lookAt(centerVec)
        }
    }
    /**根据偏移值进行处理摇摆效果 */
    rockHandler(offset: number) {
        var lenFloor = this._floorNodes.length;
        var rate = 1.5 - lenFloor * 0.003
        if (rate < 0) {
            rate = 0;
        }
        this._floorOffNum += Math.abs(offset) * rate;
        this._floorOffset += offset;

        // this.floorRockTick = this.floorContainerRockFrequency
        this.floorContainerRockFrequency = this.limit(1 + lenFloor * 0.01, 1, 3)
        // this.floorContainer.angle = Math.sin(this.floorRockTick * this.floorContainerRockFrequency) * this.maxRockRotation;
        var pos = this.getLastFloor().getWorldPosition()
        this.maxRockRotation = Math.atan(this._floorOffNum / pos.y);
        var angle = this.floorContainer.angle / this.maxRockRotation
        if (this.maxRockRotation && angle >= -1 && angle <= 1) {
            this.floorRockTick = Math.asin(angle) / this.floorContainerRockFrequency;
        }
    }
    limit(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max);
    }
    changeSkyBoxAlpha(node: Node, alpha: number, addMode: boolean) {
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
}

