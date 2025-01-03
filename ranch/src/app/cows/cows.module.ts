import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CowsComponent } from './cows.component';
import { CowEditComponent } from './cow-edit/cow-edit.component';
import { CowItemComponent } from './cow-item/cow-item.component';
import { CowListComponent } from './cow-list/cow-list.component';

import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CowsComponent,
    CowEditComponent,
    CowListComponent,
    CowItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
  ]
})
export class CowsModule { } 