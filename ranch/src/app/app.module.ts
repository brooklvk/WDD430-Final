import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CowsModule } from './cows/cows.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,  // Declare HeaderComponent here
    FooterComponent,  // Declare FooterComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CowsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
