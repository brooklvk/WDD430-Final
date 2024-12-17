import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cow } from '../cow.model';
import { CowService } from '../cow.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrl: './cow-list.component.css'
})
export class CowListComponent implements OnInit, OnDestroy {
  cows: Cow[] = [];
  subscription: Subscription;

  constructor(public cowService: CowService) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.cows = this.cowService.getCows();

    this.subscription = this.cowService.cowListChangedEvent.subscribe((cowsList: Cow[]) => {
      this.cows = cowsList;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
