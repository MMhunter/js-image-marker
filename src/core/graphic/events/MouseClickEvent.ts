import {Layer} from "../Layer";
import {JMMouseEvent} from "./MouseEvent";

export class JMMouseClickEvent extends JMMouseEvent {

    constructor(event: MouseEvent, path: Layer[]) {
        super("click", event, path);
    }
}