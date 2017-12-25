import {Layer} from "./Layer";

export class RootLayer extends Layer {

    constructor(ctx: CanvasRenderingContext2D) {
        super();
        this.frame = {
            offset: {
                x: 0,
                y: 0,
            },
            size: {
                width: ctx.canvas.offsetWidth,
                height: ctx.canvas.offsetHeight,
            },
        };
    }

    protected drawAt(ctx: CanvasRenderingContext2D): void {

        ctx.rect(20, 20, this.frame.size.width - 40, this.frame.size.height - 40);
        ctx.fillStyle = ["green", "red", "yellow" ][Math.floor(Math.random() * 3)];
        ctx.fill();
    }

}