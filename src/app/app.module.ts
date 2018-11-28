import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { SeriesService } from './services/series.service';
import { GuideComponent } from './guide/guide.component';
import { HomeComponent } from './home/home.component';
import { MyshowsComponent } from './myshows/myshows.component';
import { SeriesComponent } from './series/series.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FanartPipe, FilterByPipe, LimitToPipe, SearchPipe, UrlPipe } from './pipes/index';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './user/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search/search.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import {SeenbuttonComponent} from './buttons/seen/seen-button.component';
import {FollowbuttonComponent} from './buttons/follow/follow-button.component';

const routes: Routes = [
    {
      path: 'series/:uniqueName',
      component: SeriesComponent
    },
    {
      path: 'myshows',
      component: MyshowsComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'guide',
      component: GuideComponent
    },
    {
      path: 'home',
      component: HomeComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GuideComponent,
    HomeComponent,
    MyshowsComponent,
    SeriesComponent,
    ProfileComponent,
    UserStatsComponent,
    SearchComponent,
    SeenbuttonComponent,
    FollowbuttonComponent,
    SearchPipe,
    UrlPipe,
    FanartPipe,
    FilterByPipe,
    LimitToPipe
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [ApiService, SeriesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

