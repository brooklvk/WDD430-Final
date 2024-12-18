import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Cow } from '../cow.model';
import { CowService } from '../cow.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'ranch-cow-edit',
  templateUrl: './cow-edit.component.html',
  styleUrl: './cow-edit.component.css',
  standalone: false,
})
export class CowEditComponent implements OnInit {

  originalCow: Cow = {} as Cow;
  cow: Cow = {} as Cow;
  editMode: boolean = false;
  nativeWindow: any;

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
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalCow = this.cowService.getCow(id);
      if (!this.originalCow) {
        return;
      }

      this.editMode = true;
      this.cow = JSON.parse(JSON.stringify(this.originalCow));
      console.log('Loaded cow:', this.originalCow);
    });
  }

  onSubmit(f : NgForm) {
    var id = f.value.id;
    var tag = f.value.tag;
    var birth_year = f.value.birth_year;
    var description = f.value.description;
    
    var newCow = new Cow(id, tag, birth_year, description);

   if (this.editMode) {
    this.cowService.updateCow(this.originalCow, newCow);
   }
   else {
    this.cowService.addCow(newCow);
   }
  
  this.router.navigate(['/cow-list']);
  }

  onCancel() {
    this.router.navigate(['/cow-list']);
  }
}
