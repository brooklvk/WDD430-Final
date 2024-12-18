import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cow } from '../cow.model';
import { CowService } from '../cow.service';
import { CowItemComponent } from '../cow-item/cow-item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrl: './cow-list.component.css',
  imports: [CowItemComponent, CommonModule]
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
