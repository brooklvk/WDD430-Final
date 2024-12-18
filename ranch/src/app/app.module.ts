import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CowsModule } from './cows/cows.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,  
    FooterComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CowsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
