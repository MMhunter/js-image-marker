
import {Layer} from "./Layer";
import {RootLayer} from "./RootLayer";

export class LayerManager {

    private rootLayer: RootLayer;

    private ctx: CanvasRenderingContext2D;

    private pendingDraw: boolean = false;

    private layersNeedRedraw: Layer[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.rootLayer = new RootLayer(this.ctx);
        this.rootLayer.manager = this;
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


}