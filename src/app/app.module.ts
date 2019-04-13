import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SeriesService } from './services/series.service';
import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FanartPipe, FilterByPipe, LimitToPipe } from './pipes/index';
import { LoginComponent } from './user/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SeenbuttonComponent } from './buttons/seen/seen-button.component';
import { FollowbuttonComponent } from './buttons/follow/follow-button.component';
import { WebStorageModule } from 'h5webstorage';
import { GuideModule } from './guide/guide.module';
import { MyshowsModule } from './myshows/myshows.module';
import { AppSharedModule } from './app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortablejsModule } from 'angular-sortablejs';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TestComponent} from './test/test.component';
import { BrowseModule} from './browse/browse.module';
import { ProfileModule } from './profile/profile.module';


const routes: Routes = [
    {
      path: 'series/:uniqueName',
      component: SeriesComponent
    },
    {
      path: 'series/genre/:genre',
      data: {animation: 'HomePage'},
      loadChildren: () => BrowseModule
    },
    {
      path: 'myshows',
      data: {animation: 'HomePage'},
      loadChildren: () => MyshowsModule
    },
    {
      path: 'profile',
      loadChildren: () => ProfileModule
    },
    {
      path: 'guide',
      data: {animation: 'GuidePage'},
      loadChildren: () => GuideModule
    },
    {
      path: '',
      data: {animation: 'HomePage'},
      component: HomeComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SeriesComponent,
    SearchComponent,
    SeenbuttonComponent,
    FollowbuttonComponent,
    FanartPipe,
    FilterByPipe,
    LimitToPipe,
    TestComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppSharedModule,
    GuideModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    WebStorageModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [
    SeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

