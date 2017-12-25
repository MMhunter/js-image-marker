import {IDisposable} from "../Common";
import {IOffset, ISize} from "./Graphic";
import {LayerManager} from "./LayerManager";

export abstract class Layer implements IDisposable {
    
    public cache: HTMLCanvasElement;

    /**
     * Whether this layer needs to be redraw in next drawing process
     * @type {boolean}
     */
    public needsRedraw: boolean = false;

    /**
     * Sub Layers Array.
     * @type {Array}
     */
    public subLayers: Layer[] = [];

    /**
     * Parent Layer
     */
    public parent: Layer;

    public frame: ILayerFrame;

    /**
     * Current state of this layer.
     */
    protected state: LayerState;

    /**
     * Whether this layer is hidden
     */
    protected hidden: boolean = false;

    /**
     * the layer manager that this layer is attached to
     */
    protected manager: LayerManager;

    private _frameToRoot: ILayerFrame;

    public get frameToRoot(): ILayerFrame {
        if (!this._frameToRoot) {
            this._frameToRoot = this.frame;
            if (this.parent) {
                this._frameToRoot.offset.x += this.parent.frameToRoot.offset.x;
                this._frameToRoot.offset.y += this.parent.frameToRoot.offset.y;
            }
        }
        return this._frameToRoot;
    }
    /**
     * Get the layer's state
     * @returns {LayerState}
     */
    public getState(): LayerState {
        return this.state;
    }

    /**
     * return the layer's hidden state
     * @returns {boolean}
     */
    public isHidden(): boolean {
        return this.hidden;
    }

    public setHidden(hidden: boolean): void {
        this.hidden = hidden;
    }

    /**
     * Tell the manager to redraw this layer and its sub layers
     */
    public setNeedsReDraw(): void {

        this.cache = null;
        this._frameToRoot = null;

        return;

    }

    /**
     * Add a layer to its sub layers array
     * @param {Layer} layer
     */
    public addLayer(layer: Layer): void {

        layer.manager = this.manager;
        layer.parent = this;
        this.subLayers.push(layer);
        this.setNeedsReDraw();
    }

    public dispose(): void {
        return;
    }

    /**
     * Draw the layer in target context.
     * @param {CanvasRenderingContext2D} ctx
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        this._frameToRoot = null;
        this.drawAt(ctx);
    }

    /**
     * Draw the layer in target context. The main implementation
     * @param {CanvasRenderingContext2D} ctx
     */
    protected abstract drawAt(ctx: CanvasRenderingContext2D): void;

}

export enum LayerState {

    Created,
    Drawing,
    Display,
    Destroyed,

}

export interface ILayerFrame {

    size: ISize;
    
    offset: IOffset;

}
