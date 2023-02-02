import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent, AddButtonDialog } from './counter/counter.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthModule } from './auth/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor-service.service';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { RecentSessionComponent } from './recent-session/recent-session.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    HomeComponent,
    HeaderComponent,
    GlobalStatsComponent,
    AddButtonDialog,
    RecentSessionComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [CounterComponent, AddButtonDialog],
})
export class AppModule {}
