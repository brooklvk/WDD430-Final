import { Component, OnInit } from '@angular/core';
import { Cow } from '../cows/cow.model';
import { CowService } from './cow.service';

@Component({
  selector: 'ranch-cows',
  templateUrl: './cows.component.html',
  standalone: false,
  styleUrl: './cows.component.css'
})
export class CowsComponent implements OnInit {
  selectedCow!: Cow;

  constructor(public cowService: CowService) {}

  ngOnInit() {
    this.cowService.cowSelectedEvent.subscribe((cow: Cow) => {
      this.selectedCow = cow;
    });
}
}
