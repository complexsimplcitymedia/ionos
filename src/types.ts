export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PaintOption {
  id: string;
  name: string;
  hex: string;
  type: 'standard' | 'metallic' | 'pearl' | 'matte';
  price: number;
}

export interface WrapOption {
  id: string;
  name: string;
  image: string;
  type: 'solid' | 'chrome' | 'metallic' | 'color-shift';
  price: number;
}

export interface BodyworkOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface CarConfig {
  service: string;
  paintType?: string;
  wrapType?: string;
  bodywork: string[];
  addons: string[];
}