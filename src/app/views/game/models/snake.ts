import {BodyPart} from './body-part';
import {Direction} from './direction';

export class Snake {
  body: BodyPart[];
  direction: Direction;

  constructor() {
    this.body = [];
    this.direction = Direction.DOWN;
  }
}
