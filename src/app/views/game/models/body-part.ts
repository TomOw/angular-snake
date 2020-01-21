import {BodyPartType} from './body-part-type';

export class BodyPart {
  x: number;
  y: number;
  type: BodyPartType;


  constructor(x: number, y: number, type: BodyPartType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}
