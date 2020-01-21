import {Component, HostListener, OnInit} from '@angular/core';
import {Snake} from './models/snake';
import {BodyPart} from './models/body-part';
import {BodyPartType} from './models/body-part-type';
import {GameService} from './game.service';
import {interval} from 'rxjs';
import {Direction} from './models/direction';

@Component({
  selector: 'snk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  Direction = Direction;
  snake: Snake = new Snake();
  clock = interval(200);

  constructor(private gameService: GameService) {
  }

  @HostListener('window:keyup', ['$event'])
  changeDirection(event: KeyboardEvent) {
    console.log(event.key);
    switch (event.key) {
      case 'ArrowUp': {
        this.setDirection(Direction.UP);
        break;
      }
      case 'ArrowRight': {
        this.setDirection(Direction.RIGHT);
        break;
      }
      case 'ArrowDown': {
        this.setDirection(Direction.DOWN);
        break;
      }
      case 'ArrowLeft': {
        this.setDirection(Direction.LEFT);
        break;
      }
    }
  }

  ngOnInit() {
    this.snake.body.push(new BodyPart(1, 1, BodyPartType.HEAD));
    this.snake.body.push(new BodyPart(2, 1, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(3, 1, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 1, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 2, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 3, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 4, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 5, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 6, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 6, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 7, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(4, 8, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(5, 8, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(6, 8, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(7, 8, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(8, 8, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(9, 8, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(10, 8, BodyPartType.BODY));
    this.snake.body.push(new BodyPart(11, 8, BodyPartType.BODY));

    this.gameService.emitSnake(this.snake);

    this.clock.subscribe(tick => {
      this.moveSnake();
    });

  }

  addNext() {
    const last = this.snake.body[this.snake.body.length - 1];
    this.snake.body.push(new BodyPart(last.x + 1, last.y, BodyPartType.BODY));
    this.gameService.emitSnake(this.snake);
  }

  moveSnake() {
    const first = this.snake.body[0];
    let newHead: BodyPart;
    first.type = BodyPartType.BODY;
    switch (this.snake.direction) {
      case Direction.UP:
        newHead = new BodyPart(first.x, first.y - 1, BodyPartType.HEAD);
        break;
      case Direction.RIGHT:
        newHead = new BodyPart(first.x + 1, first.y, BodyPartType.HEAD);
        break;
      case Direction.DOWN:
        newHead = new BodyPart(first.x, first.y + 1, BodyPartType.HEAD);
        break;
      case Direction.LEFT:
        newHead = new BodyPart(first.x - 1, first.y, BodyPartType.HEAD);
        break;
    }
    this.snake.body.unshift(newHead);
    this.snake.body.pop();
    this.gameService.emitSnake(this.snake);
  }

  setDirection(direction: Direction) {
    this.snake.direction = direction;
  }

}
