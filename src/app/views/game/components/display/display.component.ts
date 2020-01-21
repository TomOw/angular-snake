import {Component, Input, OnInit} from '@angular/core';
import {Snake} from '../../models/snake';
import {Pixel} from './models/pixel';
import {DisplayRow} from './models/display-row';
import {GameService} from '../../game.service';

@Component({
  selector: 'snk-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() sizeX: number;
  @Input() sizeY: number;

  snake: Snake;
  rows: DisplayRow[] = [];

  showCoordinates = true;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.sizeY; i++) {
      const row: DisplayRow = new DisplayRow();
      for (let j = 0; j < this.sizeX; j++) {
        row.pixels.push(new Pixel(j, i));
      }
      this.rows.push(row);
    }

    this.gameService.observeSnake().subscribe(snake => {
      this.drawSnake(snake);
    });
  }

  cleanDisplay() {
    this.rows.forEach(row => {
      row.pixels.forEach(pixel => {
        pixel.active = false;
      });
    });
  }

  drawSnake(snake: Snake) {
    this.cleanDisplay();
    if (snake && this.rows) {
      snake.body.forEach(part => {
        this.rows[part.y].pixels[part.x].active = true;
      });
    }
  }

}
