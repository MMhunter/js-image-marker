import {makerFrame} from "./graphic/Layer";
import {LayerManager} from "./graphic/LayerManager";
import {ImageLayer} from "./graphic/layers/ImageLayer";

export class JSImageMarker {

    public container: HTMLElement;

    public image: HTMLImageElement;

    public layerManager: LayerManager;

    private ctx: CanvasRenderingContext2D;

    constructor(container: HTMLElement) {
        this.container = container;
        this.createCanvas();
        this.run().then((r: number) => {
            alert(r);
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

        this.layerManager = new LayerManager(this.ctx);

        const image: ImageLayer = new ImageLayer("http://mfeducation.cn/images/2bintro.png", makerFrame(0, 0 , 100, 100));
        const image2: ImageLayer = new ImageLayer("http://mfeducation.cn/images/2bintro.png", makerFrame(0, 0 , 100, 100));
        this.layerManager.addTopLayer(image);
        this.layerManager.addTopLayer(image2);

        setInterval(() => {
            image.frame.offset.x ++;
            image2.frame.offset.y ++;
            this.layerManager.requestRedraw();
        }, 10);
    }

    private run(): Promise<any> {

        return Promise.resolve(123);

    }

}