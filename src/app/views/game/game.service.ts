import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Snake} from './models/snake';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  snake$: Subject<Snake> = new BehaviorSubject<Snake>(null);

  constructor() { }

  emitSnake(snake: Snake): void {
    this.snake$.next(snake);
  }

  observeSnake(): Observable<Snake> {
    return this.snake$.asObservable();
  }
}
