import {Layer} from "../Layer";
import {JMMouseEvent} from "./MouseEvent";

export class JMMouseDownEvent extends JMMouseEvent {

    constructor(event: MouseEvent,  path: Layer[]) {
        super("mousedown", event, path);
    }
}