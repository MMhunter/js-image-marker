import {LayerManager} from "./graphic/LayerManager";

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

    }

    private run(): Promise<any> {

        return Promise.resolve(123);

    }

}