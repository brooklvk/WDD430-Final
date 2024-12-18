import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cow } from '../cow.model';
import { CowService } from '../cow.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ranch-cow-edit',
  templateUrl: './cow-edit.component.html',
  styleUrls: ['./cow-edit.component.css'],
  standalone: false
})
export class CowEditComponent implements OnInit {

  originalCow: Cow = {} as Cow;
  cow: Cow = {} as Cow;
  editMode: boolean = false;
  nativeWindow: any;
  subscription: Subscription = new Subscription();

  constructor(
    private cowService: CowService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) {
    this.originalCow = new Cow('','',0,'');
    this.cow = new Cow('','',0,'');
    this.nativeWindow = windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; // Correctly extract the `id`
      console.log('Cow ID from route:', id);
      if (!id) {
        this.editMode = false;
        return;
      }
      this.editMode = true;
      this.cowService.getCow(id).subscribe((cow: Cow) => {
        this.cow = cow;
      });
    });
  }
  

  onSubmit(f: NgForm) {
    const id = f.value.id;
    const tag = f.value.tag;
    const birth_year = f.value.birth_year;
    const description = f.value.description;
    
    const newCow = new Cow(id, tag, birth_year, description);

    if (this.editMode) {
      this.cowService.updateCow(this.originalCow, newCow);
    } else {
      this.cowService.addCow(newCow);
    }
  
    this.router.navigate(['/cows/cow-list']);
  }

  onCancel() {
    this.router.navigate(['/cows/cow-list']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Make sure to clean up the subscription
  }
}
