
import {isPointInFrame, Layer} from "./Layer";
import {RootLayer} from "./RootLayer";
import {JMMouseDownEvent} from "./events/MouseDownEvent";
import {JMMouseUpEvent} from "./events/MouseUpEvent";
import {JMMouseClickEvent} from "./events/MouseClickEvent";
import {JMMouseMoveEvent} from "./events/MouseMoveEvent";

export class LayerManager {

    private rootLayer: RootLayer;

    private ctx: CanvasRenderingContext2D;

    private canvas: HTMLCanvasElement;

    private pendingDraw: boolean = false;

    private layersNeedRedraw: Layer[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.rootLayer = new RootLayer(this.ctx);
        this.rootLayer.manager = this;

        // canvas.addEventListener("mousedown", (e) => {
        //     this.getRootLayer().digestEvent(new JMMouseDownEvent(e));
        // });
        //
        // canvas.addEventListener("mouseup", (e) => {
        //     this.getRootLayer().digestEvent(new JMMouseUpEvent(e));
        // });
        //
        // canvas.addEventListener("mousemove", (e) => {
        //     this.getRootLayer().digestEvent(new JMMouseMoveEvent(e));
        // });
        canvas.addEventListener("mousedown", (e) => {
            const path = this.findLayerPath(e.offsetX, e.offsetY);
            const event = new JMMouseDownEvent(e, path);
            path.forEach((layer) => {
                layer.dealWithEvent(event);
            });
        });

        canvas.addEventListener("mouseup", (e) => {
            const path = this.findLayerPath(e.offsetX, e.offsetY);
            const event = new JMMouseUpEvent(e, path);
            path.forEach((layer) => {
                layer.dealWithEvent(event);
            });
        });

        canvas.addEventListener("mousemove", (e) => {
            const path = this.findLayerPath(e.offsetX, e.offsetY);
            const event = new JMMouseMoveEvent(e, path);
            path.forEach((layer) => {
                layer.dealWithEvent(event);
            });
        });
    }

    public requestRedraw(): void {
        if (!this.pendingDraw) {
            this.pendingDraw = true;
            window.requestAnimationFrame(() => {
                this.pendingDraw = false;
                this.draw(true);
            });
        }
    }

    public addTopLayer(layer: Layer): void {
        this.rootLayer.addLayer(layer);
    }

    public addLayerToRedrawQueue(layer: Layer): void {

        let parent: Layer = layer.parent;

        while (parent) {
            if (parent.needsRedraw) {
                return;
            }
            parent = parent.parent;
        }

        this.layersNeedRedraw.push(layer);
    }

    public getRootLayer(): RootLayer {

        return this.rootLayer;

    }

    /**
     * draw the
     * @param {Layer} layer
     * @param {boolean} ignoreCache
     */
    private drawLayer(layer: Layer, ignoreCache: boolean = false): void {

        if (ignoreCache || !layer.cache) {
            layer.cache = document.createElement("canvas");
            layer.cache.width = layer.frame.size.width;
            layer.cache.height = layer.frame.size.height;
            const ctx: CanvasRenderingContext2D = layer.cache.getContext("2d");
            layer.draw(ctx);
        }

        this.ctx.drawImage(layer.cache, layer.frameToRoot.offset.x, layer.frameToRoot.offset.y, layer.frameToRoot.size.width, layer.frameToRoot.size.height);

        for (const sublayer of layer.subLayers) {
            this.drawLayer(sublayer);
        }

    }

    private draw(ignoreCache: boolean = false): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.offsetWidth, this.ctx.canvas.offsetHeight);
        this.drawLayer(this.rootLayer, ignoreCache);
    }

    private findLayerPath(x: number, y: number): Layer[] {
        const path: Layer[] = [];
        this.checkLayer(x, y, this.getRootLayer(), path);
        return path.reverse();
    }

    private checkLayer(x: number, y: number, layer: Layer, path: Layer[]): boolean{
        const isInFrame = isPointInFrame(x, y, layer.frameToRoot);
        if (isInFrame) {
            path.push(layer);
            if (layer.subLayers.length > 0) {
               for (let i = layer.subLayers.length - 1 ; i >= 0; i--) {
                   if (this.checkLayer(x, y, layer.subLayers[i], path)) {
                      break;
                   }
               }
            }
        }
        return isInFrame;
    }

}