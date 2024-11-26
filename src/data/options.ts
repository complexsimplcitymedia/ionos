import { ServiceOption, PaintOption, WrapOption, BodyworkOption } from '../types';

export const services: ServiceOption[] = [
  {
    id: 'custom-paint',
    name: 'Custom Paint Job',
    description: 'Professional multi-stage paint application with premium materials',
    price: 3500,
  },
  {
    id: 'vehicle-wrap',
    name: 'Vehicle Wrap',
    description: 'High-quality vinyl wraps with 5-year warranty',
    price: 2800,
  },
];

export const paintOptions: PaintOption[] = [
  {
    id: 'midnight-black',
    name: 'Midnight Black',
    hex: '#000000',
    type: 'metallic',
    price: 500,
  },
  {
    id: 'pearl-white',
    name: 'Pearl White',
    hex: '#FFFFFF',
    type: 'pearl',
    price: 800,
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    hex: '#0047AB',
    type: 'metallic',
    price: 600,
  },
  {
    id: 'matte-grey',
    name: 'Stealth Grey',
    hex: '#2F4F4F',
    type: 'matte',
    price: 900,
  },
  {
    id: 'candy-red',
    name: 'Candy Apple Red',
    hex: '#FF0800',
    type: 'pearl',
    price: 1000,
  },
];

export const wrapOptions: WrapOption[] = [
  {
    id: 'satin-black',
    name: 'Satin Black',
    image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=600&q=80',
    type: 'solid',
    price: 0,
  },
  {
    id: 'chrome-silver',
    name: 'Chrome Silver',
    image: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?auto=format&fit=crop&w=600&q=80',
    type: 'chrome',
    price: 1200,
  },
  {
    id: 'color-shift',
    name: 'Chameleon Flip',
    image: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=600&q=80',
    type: 'color-shift',
    price: 1500,
  },
];

export const bodyworkOptions: BodyworkOption[] = [
  {
    id: 'dent-repair',
    name: 'Dent Repair',
    description: 'Professional dent removal and surface restoration',
    price: 400,
  },
  {
    id: 'scratch-repair',
    name: 'Scratch Repair',
    description: 'Deep scratch and paint correction',
    price: 300,
  },
  {
    id: 'panel-replacement',
    name: 'Panel Replacement',
    description: 'OEM panel replacement and color matching',
    price: 1200,
  },
];

export const addons: BodyworkOption[] = [
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating',
    description: '5-year protection with premium ceramic coating',
    price: 1500,
  },
  {
    id: 'paint-protection',
    name: 'Paint Protection Film',
    description: 'Clear protective film for high-impact areas',
    price: 800,
  },
  {
    id: 'window-tint',
    name: 'Window Tinting',
    description: 'Premium ceramic window tint installation',
    price: 400,
  },
];