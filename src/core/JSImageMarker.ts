import {makeFrame} from "./graphic/Layer";
import {LayerManager} from "./graphic/LayerManager";
import {ImageLayer} from "./graphic/layers/ImageLayer";
import {JMMouseMoveEvent} from "./graphic/events/MouseMoveEvent";
import {JMMouseDownEvent} from "./graphic/events/MouseDownEvent";

export class JSImageMarker {

    public container: HTMLElement;

    public image: HTMLImageElement;

    public layerManager: LayerManager;

    private ctx: CanvasRenderingContext2D;

    constructor(container: HTMLElement) {
        this.container = container;
        this.createCanvas();
        this.run().then((r: number) => {
            // alert(r);
        });
    }

    /**
     * create the canvas for drawing
     */
    private createCanvas(): void {

        const canvas = document.createElement("canvas");

        canvas.width = this.container.offsetWidth;

        canvas.height = this.container.offsetHeight;

        this.ctx = canvas.getContext("2d");

        this.container.innerHTML = "";

        this.container.appendChild(canvas);

        this.layerManager = new LayerManager(canvas);

        const image: ImageLayer = new ImageLayer("http://mfeducation.cn/images/2bintro.png", makeFrame(30, 30 , 100, 100));

        this.layerManager.addTopLayer(image);

        this.dragTest(image);
    }

    private run(): Promise<any> {

        return Promise.resolve(123);

    }

    private dragTest(image: ImageLayer) {
        let isDragging = false;
        let oX = 0;
        let oY = 0;
        image.on("mousedown", (e: JMMouseDownEvent) => {
            isDragging = true;
            oX = e.offsetX;
            oY = e.offsetY;
        });
        image.on("mouseup", (e) => {
            isDragging = false;
        });
        image.on("mousemove", (e: JMMouseMoveEvent) => {
            if (isDragging) {
                image.frame.offset.x = e.canvasX - oX;
                image.frame.offset.y = e.canvasY - oY;
                image.setNeedsReDraw();
            }
        });

    }

}