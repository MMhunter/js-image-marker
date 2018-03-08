import {JMEvent} from "../Event";
import {Layer} from "../Layer";

export class JMMouseEvent extends JMEvent {

    public originalEvent: MouseEvent;

    public path: Layer[];

    public offsetX: number = 0;

    public offsetY: number = 0;

    public canvasX: number = 0;

    public canvasY: number = 0;

    constructor(name: string, event: MouseEvent, path: Layer[]) {
        super(name, event);
        this.path = path;
        this.canvasX = event.offsetX;
        this.canvasY = event.offsetY;
        this.offsetX = event.offsetX - this.path[0].frameToRoot.offset.x;
        this.offsetY = event.offsetY - this.path[0].frameToRoot.offset.y;
    }
}
