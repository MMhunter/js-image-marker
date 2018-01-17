import {Layer} from "./Layer";

export class RootLayer extends Layer {

    constructor(ctx: CanvasRenderingContext2D) {
        super({
            offset: {
                x: 0,
                y: 0,
            },
            size: {
                width: ctx.canvas.offsetWidth,
                height: ctx.canvas.offsetHeight,
            },
        });
    }

    protected drawAt(ctx: CanvasRenderingContext2D): void {
        return;
    }

}