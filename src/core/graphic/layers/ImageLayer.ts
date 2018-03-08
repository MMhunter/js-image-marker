import {ILayerFrame, Layer} from "../Layer";

export class ImageLayer extends Layer {

    private imageURL: string;

    private _image: HTMLImageElement;

    private _loaded: boolean = false;

    constructor(imageURL: string, frame: ILayerFrame) {
        super(frame);
        this.setImageURL(imageURL);
    }

    public setImageURL(imageURL: string) {

        this.imageURL = imageURL;
        this.loadImage();
    }

    public getImageURL(): string{
        return this.imageURL;
    }

    protected drawAt(ctx: CanvasRenderingContext2D): void {
        if (this._image && this._loaded) {
            ctx.drawImage(this._image, 0, 0, this.frame.size.width, this.frame.size.height);
        }

        return;
    }

    private loadImage(): void {

        this._image = new Image();
        this._image.src = this.imageURL;
        this._loaded = false;
        const image: HTMLImageElement = this._image;
        this._image.onload = () => {
            if (this._image === image) {
                this._loaded = true;
                this.setNeedsReDraw();
            }
        };
    }

}