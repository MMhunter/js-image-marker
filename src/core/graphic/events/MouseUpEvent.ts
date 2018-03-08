import {Layer} from "../Layer";
import {JMMouseEvent} from "./MouseEvent";

export class JMMouseUpEvent extends JMMouseEvent {

    constructor(event: MouseEvent,  path: Layer[]) {
        super("mouseup", event, path);
    }
}