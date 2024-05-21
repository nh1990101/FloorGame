import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainUI')
export class MainUI extends Component {
    @property(Label)
    public lb_floorNum: Label;
    start() {
        this.lb_floorNum.string = "x0";
    }

    update(deltaTime: number) {

    }
    onClickMenu() {
        console.log("菜单弹出")
    }
    public setFloorNum(num: number) {
        this.lb_floorNum.string = "x" + num;
    }
}


