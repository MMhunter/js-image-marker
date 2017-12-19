export class JSImageMarker {

    public container: HTMLElement;

    public image: HTMLImageElement;

    private ctx: CanvasRenderingContext2D;

    constructor(container: HTMLElement) {
        this.container = container;
        this.createCanvas();
    }

    private createCanvas(): void {

        const canvas = document.createElement("canvas");

        canvas.width = this.container.offsetWidth;

        canvas.height = this.container.offsetHeight;

        this.container.innerHTML = "";

        this.container.appendChild(canvas);

    }

}