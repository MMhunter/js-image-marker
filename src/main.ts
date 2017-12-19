
import {JSImageMarker} from "./core/JSImageMarker";

export function createMarker(container: HTMLElement, options: IMarkerCreationOptions = {}): JSImageMarker {

    return new JSImageMarker(container);

}

export interface IMarkerCreationOptions {

    image?: string;

}