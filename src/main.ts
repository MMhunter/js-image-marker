
import {JSImageMarker} from "./core/JSImageMarker";

export function createMarker(container: HTMLElement, options: IMarkerCreationOptions = {}): JSImageMarker {

    // warn user when promise feature is not available
    if (typeof Promise === "undefined") {
        alert("Image Marker needs Promise feature to work as intended. Please load promise polyfill libraries like bluebird.js before this library.");
        return;
    }
    
    return new JSImageMarker(container);

}

export interface IMarkerCreationOptions {

    image?: string;

}