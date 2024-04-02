import { _decorator, Color, Component, director, DistanceJoint2D, ERigidBody2DType, Graphics, HingeJoint2D, Input, instantiate, Node, Prefab, Quat, resources, RigidBody2D, Sprite, Vec2, Vec3 } from 'cc';
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
    @property(Graphics)
    public myGraph: Graphics;
    @property(Node)
    public mainUI: Node;
    @property(Node)
    public holder: Node;
    protected dj2d: DistanceJoint2D;
    protected beRotateObj: RigidBody2D
    private scanAngle: Vec3;
    private _moveDir: number = 50;
    private readonly distance = 100;
    // private localCenter: Vec2;
    private forceVec: Vec2;
    private _curTick = 0;
    private readonly disForceTime = 2;
    private readonly MaxAngle = 30;
    private readonly DOWN_DIR = new Vec3(0, -1, 0)
    private isMove = false;
    private myPosBegin: Vec3;
    private myTargetPoint: Vec3;

    start() {
        this.assetMgr.preLoadBundles().then(() => {
            this.assetMgr.getRes("BaseBox", Prefab, "components").then(data => { this.createBox(data) })
        });

        if (this.staticBody) {
            var distance2D = this.staticBody.getComponent(DistanceJoint2D)
            this.dj2d = distance2D;
            this.forceVec = new Vec2(this._moveDir, 0);
            this.myGraph.lineWidth = 10;
            this.myGraph.lineCap = Graphics.LineCap.ROUND;
            this.myGraph.strokeColor = Color.BLUE;
            this.myPosBegin = new Vec3();
            this.myTargetPoint = new Vec3();
        }
        this.mainUI.on(Input.EventType.TOUCH_START, this.onClickMainUI, this)
    }

    update(deltaTime: number) {

        if (this.baseBox) {
            this.myPosBegin = this.staticBody.node.getPosition()
            this.myTargetPoint = this.baseBox.node.getPosition();

            this.myGraph.clear();
            this.myPosBegin.x += this.dj2d.anchor.x
            this.myPosBegin.y += this.dj2d.anchor.y

            this.myGraph.moveTo(this.myPosBegin.x, this.myPosBegin.y);

            this.myTargetPoint.x += this.dj2d.connectedAnchor.x
            this.myTargetPoint.y += this.dj2d.connectedAnchor.y
            this.myGraph.lineTo(this.myTargetPoint.x, this.myTargetPoint.y);
            this.myGraph.stroke();

            this._curTick += deltaTime;
            if (!this.isMove) {
                this.baseBox.applyForceToCenter(this.forceVec, true);
                if (this._curTick > this.disForceTime) {

                    this.isMove = true;
                }
            }

        }


    }
    createBox(box: Prefab) {
        if (box) {
            var obj = this.assetMgr.instantiate(box);
            this.baseBox = obj.getComponent(RigidBody2D);
            if (this.baseBox) {
                this.dj2d.connectedBody = this.baseBox
                this.baseBox.node.parent = this.holder;
            }
        }
    }
    onClickMainUI() {
        console.log("点击了")
    }
}

