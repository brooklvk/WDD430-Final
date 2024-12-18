import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowListComponent } from './cows/cow-list/cow-list.component';
import { CowEditComponent } from './cows/cow-edit/cow-edit.component';


const routes: Routes = [
  {path:'', redirectTo: '/cows/cow-list', pathMatch: 'full'},
  {path:'cows/cow-list', component: CowListComponent},
  {path:'cows/edit', component: CowEditComponent},
  {path:'cows/edit/:id', component: CowEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
