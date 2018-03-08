import {IDisposable} from "../Common";
import {IOffset, ISize} from "./Graphic";
import {LayerManager} from "./LayerManager";
import {JMEvent} from "./Event";
import {JMMouseDownEvent} from "./events/MouseDownEvent";

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
     * the layer manager that this layer is attached to
     */
    public manager: LayerManager;

    /**
     * Current state of this layer.
     */
    protected state: LayerState;

    /**
     * Whether this layer is hidden
     */
    protected hidden: boolean = false;

    private _frameToRoot: ILayerFrame;

    private listeners: {[key: string]: Array<(event?: JMEvent) => any>} = {};

    constructor(frame: ILayerFrame) {
        this.frame = frame;
    }

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

    public on(name: "mousedown" | "mouseup" | "mousemove" | "click", listener: (event?: JMEvent) => any) {
        if (this.listeners[name] == null) {
            this.listeners[name] = [];
        }
        this.listeners[name].unshift(listener);
    }

    public digestEvent(event: JMEvent) {
        if (event.isPropagationStopped()) {
            return;
        }
        this.subLayers.forEach((sublayer) => {
            sublayer.digestEvent(event);
        });
        if (event.isPropagationStopped()) {
            return;
        }
        this.dealWithEvent(event);
    }

    public dealWithEvent(event: JMEvent) {
        if (this.listeners[event.name] && this.listeners[event.name].length > 0){
            this.listeners[event.name].forEach((listener) => {
                if (event.isPropagationStopped()) {
                    return;
                }
                listener(event);
            });
        }
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
        this.manager.requestRedraw();
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

export function makeFrame(x: number, y: number, width: number, height: number): ILayerFrame {
    return {
        size: {
            width: width,
            height: height,
        },
        offset: {
            x: x,
            y: y,
        },
    };
}

export function isPointInFrame(x: number, y: number, frame: ILayerFrame): boolean {
    if (x > frame.offset.x && x < frame.offset.x + frame.size.width) {
        if (y > frame.offset.y && y < frame.offset.y + frame.size.height) {
            return true;
        }
    }
    return false;
}