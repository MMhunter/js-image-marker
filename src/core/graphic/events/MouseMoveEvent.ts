import {Layer} from "../Layer";
import {JMMouseEvent} from "./MouseEvent";

export class JMMouseMoveEvent extends JMMouseEvent {

    constructor(event: MouseEvent,  path: Layer[]) {
        super("mousemove", event, path);
    }
}