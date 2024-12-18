import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cow } from '../cow.model';
import { CowService } from '../cow.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.css'],
  standalone: false
})
export class CowListComponent implements OnInit, OnDestroy {
  cows: Cow[] = [];
  subscription: Subscription = new Subscription();

  constructor(private cowService: CowService) {
  }

  ngOnInit() {
    // Subscribe to the cows' data and listen to changes
    this.subscription = this.cowService.getCows().subscribe((cowsList: Cow[]) => {
      this.cows = cowsList;
    });

    // Listen for updates from cow list changes
    this.subscription.add(
      this.cowService.cowListChangedEvent.subscribe((cowsList: Cow[]) => {
        this.cows = cowsList;
      })
    );
  }

  ngOnDestroy() {
    // Clean up the subscriptions when the component is destroyed
    this.subscription.unsubscribe();
  }
}
