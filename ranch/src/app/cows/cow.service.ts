import { Injectable, EventEmitter } from '@angular/core';
import { Cow } from './cow.model';
import { MOCKCOWS } from './MOCKCOWS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  cows : Cow[] = [];

  cowSelectedEvent = new EventEmitter<Cow>();
  cowChangedEvent = new EventEmitter<Cow[]>();
  cowListChangedEvent = new Subject<Cow[]>();

  maxCowId : number;

  constructor() { 
    this.cows = MOCKCOWS;
    this.maxCowId = this.getMaxId();
  }

  getCows(): Cow[] {
    return this.cows;
  }

  getCow(id: string): Cow {
    // find id that matches from the list 
    for (const cow of this.cows) {
      if (cow.id == id)
        return cow;
    }
    throw new Error(`Cow with id ${id} not found`); // Throw an error if not found
  }

  getMaxId(): number {

    var maxId = 0;

    for (const cow of this.cows) {
      var currentId = parseInt(cow.id);
      
      if (currentId > maxId)
        maxId = currentId;
    }
    return maxId;
  }

  addCow(newCow: Cow) {
    if (!newCow) {
      return;
    }

    this.maxCowId++;

    newCow.id = this.maxCowId.toString();

    this.cows.push(newCow);
    const cowsClone: Cow[] = this.cows.slice();

    this.cowListChangedEvent.next(cowsClone);
  }

  updateCow(originalCow: Cow, newCow: Cow) {
    if (!originalCow || !newCow)
        return;

    const pos = this.cows.indexOf(originalCow);

    if (pos < 0)
        return;

    newCow.id = originalCow.id;
    this.cows[pos] = newCow;
    const cowsClone : Cow[] = this.cows.slice();
    this.cowListChangedEvent.next(cowsClone);
  }
  
  deleteCow(cow: Cow) {
    if (!cow) {
       return;
    }
    const pos = this.cows.indexOf(cow);
    if (pos < 0) {
       return;
    }
    this.cows.splice(pos, 1);
    const cowsClone : Cow[] = this.cows.slice();
    this.cowListChangedEvent.next(cowsClone);
 }
 
}
