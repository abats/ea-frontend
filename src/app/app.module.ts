import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { SeriesService } from './services/series.service';
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
import {FanartPipe, FilterByPipe, LimitToPipe, OrderBy, SearchPipe, UrlPipe} from './pipes/index';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './user/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { SeenbuttonComponent } from './buttons/seen/seen-button.component';
import { FollowbuttonComponent } from './buttons/follow/follow-button.component';
import { WebStorageModule } from 'h5webstorage';
import { OrderDisplayComponent } from './myshows/orderDisplay/orderdisplay.component';
import {GuideModule} from './guide/guide.module';
import {BadgeComponent} from './myshows/badge/badge.component';
import {GuideRoutingModule} from './guide/guide.routes';

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
      loadChildren: () => GuideModule
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
    HomeComponent,
    MyshowsComponent,
    OrderDisplayComponent,
    SeriesComponent,
    ProfileComponent,
    UserStatsComponent,
    SearchComponent,
    SeenbuttonComponent,
    FollowbuttonComponent,
    SearchPipe,
    UrlPipe,
    BadgeComponent,
    OrderBy,
    FanartPipe,
    FilterByPipe,
    LimitToPipe
  ],
  imports: [
    GuideModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    WebStorageModule.forRoot()
  ],
  providers: [ApiService, SeriesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

