import {Component, Input, OnInit} from '@angular/core';
import {Snake} from '../../models/snake';
import {Pixel} from './models/pixel';
import {DisplayRow} from './models/display-row';

@Component({
  selector: 'snk-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() sizeX: number;
  @Input() sizeY: number;
  @Input() snake: Snake;

  rows: DisplayRow[] = [];

  showCoordinates = false;

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < this.sizeY; i++) {
      const row: DisplayRow = new DisplayRow();
      for (let j = 0; j < this.sizeX; j++) {
        row.pixels.push(new Pixel(i, j));
      }
      this.rows.push(row);
    }
  }

  drawSnake() {

  }

}
