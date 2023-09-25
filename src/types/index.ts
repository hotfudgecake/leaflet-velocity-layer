import { LayerOptions, ControlPosition } from 'leaflet';
import 'leaflet-velocity';

export const MAX_VELOCITY_INTENSITY = 10;

export type VelocityWindAngleConvention =
  | 'bearingCW'
  | 'bearingCCW'
  | 'meteoCW'
  | 'meteoCCW';

export type VelocitySpeedUnit = 'm/s' | 'k/h' | 'mph' | 'kt';

export interface VelocityDisplayOptions {
  // label prefix
  velocityType?: string;

  // leaflet control position
  position?: ControlPosition;

  // no data at cursor
  emptyString?: string;

  // convention used to express the wind direction as an angle from north direction in the control.
  angleConvention?: VelocityWindAngleConvention;

  // display cardinal direction alongside degrees
  showCardinal?: boolean;

  // one of: ['ms', 'k/h', 'mph', 'kt']
  speedUnit?: VelocitySpeedUnit;

  // direction label prefix
  directionString?: string;

  // speed label prefix
  speedString?: string;

  displayEmptyString?: string;
}

export interface VelocityDataHeader {
  discipline: number;
  disciplineName: string;
  gribEdition: number;
  gribLength: number;
  center: number;
  centerName: string;
  subcenter: number;
  refTime: string;
  significanceOfRT: number;
  significanceOfRTName: string;
  productStatus: number;
  productStatusName: string;
  productType: number;
  productTypeName: string;
  productDefinitionTemplate: number;
  productDefinitionTemplateName: string;
  parameterCategory: number;
  parameterCategoryName: string;
  parameterNumber: number;
  parameterNumberName: string;
  parameterUnit: string;
  genProcessType: number;
  genProcessTypeName: string;
  forecastTime: number;
  surface1Type: number;
  surface1TypeName: string;
  surface1Value: number;
  surface2Type: number;
  surface2TypeName: string;
  surface2Value: number;
  gridDefinitionTemplate: number;
  gridDefinitionTemplateName: string;
  numberPoints: number;
  shape: number;
  shapeName: string;
  gridUnits: string;
  resolution: number;
  winds: boolean;
  scanMode: number;
  nx: number;
  ny: number;
  basicAngle: number;
  subDivisions: number;
  lo1: number;
  la1: number;
  lo2: number;
  la2: number;
  dx: number;
  dy: number;
}

export interface VelocityDataItem {
  header: VelocityDataHeader;
  data: number[];
}

export type VelocityData = [VelocityDataItem, VelocityDataItem];

export interface VelocityOptions extends LayerOptions {
  displayValues?: boolean;
  displayOptions?: VelocityDisplayOptions;
  data: VelocityData | null;

  // OPTIONAL
  minVelocity?: number; // used to align color scale
  maxVelocity?: number; // used to align color scale
  velocityScale?: number; // modifier for particle animations, arbitrarily defaults to 0.005
  colorScale?: string[] | null; // define your own array of hex/rgb colors
  frameRate?: number;
  opacity?: number; // layer opacity, default 0.97
  particleAge?: number; // max number of frames a particle is drawn before regeneration
  particleMultipler?: number; // particle count scalar

  onAdd?: (() => any) | null; // callback function
  onRemove?: (() => any) | null; // callback function

  // optional pane to add the layer, will be created if doesn't exist
  // leaflet v1+ only (falls back to overlayPane for < v1)
  paneName?:
    | 'mapPane'
    | 'tilePane'
    | 'overlayPane'
    | 'shadowPane'
    | 'markerPane'
    | 'tooltipPane'
    | 'popupPane'
    | 'customPopupPane';
}
