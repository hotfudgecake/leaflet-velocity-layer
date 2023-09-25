import 'leaflet';
import { VelocityData, VelocityOptions } from './index.ts';

declare module 'leaflet' {
  export class VelocityLayer extends Layer {
    constructor(options?: VelocityOptions);

    setOpacity(opacity: number): this;

    setData(data: VelocityData): void;

    setOptions(options: Partial<VelocityOptions>): void;

    private _canvas?: HTMLCanvasElement;

    options: VelocityOptions;
  }

  export function velocityLayer(options?: VelocityOptions): VelocityLayer;
}
