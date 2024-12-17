import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowListComponent } from './cows/cow-list/cow-list.component';


const routes: Routes = [
  {path:'', redirectTo: '/cow-list', pathMatch: 'full'},
  {path:'cow-list', component: CowListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
