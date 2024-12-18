import { Component, Input } from '@angular/core';
import { Cow } from '../cow.model';
import { CowService } from '../cow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ranch-cow-item',
  templateUrl: './cow-item.component.html',
  styleUrl: './cow-item.component.css',
  standalone: false,
})
export class CowItemComponent {
  @Input() cow!: Cow;

  constructor(
    private cowService: CowService,
    private router: Router
  ) {
  }

  onDelete(id: string) {
    this.cowService.deleteCow(id);
    this.router.navigate(['/cows/cow-list']);
  }
}
