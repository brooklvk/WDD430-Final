import { Component, Input } from '@angular/core';
import { Cow } from '../cow.model';
import { CowService } from '../cow.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ranch-cow-item',
  templateUrl: './cow-item.component.html',
  styleUrl: './cow-item.component.css'
})
export class CowItemComponent {
  @Input() cow!: Cow;

  constructor(
    private cowService: CowService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.cow = new Cow('','',0,'')
  }

  onDelete() {
    this.cowService.deleteCow(this.cow);
    this.router.navigate(['/cow-list']);
  }
}
