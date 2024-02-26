export interface IShipPosition {
  x: number;
  y: number;
}

export interface IShipCell {
  x: number;
  y: number;
  status: 1 | 3 | 4;
}

export default interface IShip {
  position: IShipPosition;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
  shipCells?: IShipCell[];
  isKilled?: boolean;
}
