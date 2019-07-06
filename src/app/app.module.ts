import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SeriesService } from './services/series.service';
import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { AppRoutingModule } from './app-routing.module';
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
import { AppSharedModule } from './app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortablejsModule } from 'angular-sortablejs';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TestComponent} from './test/test.component';
import { RegisterUserComponent } from './user/register-user/register.user.component';
import { PasswordRecoveryComponent } from './user/password-recovery/password.recovery.component';
import { UserWelcomeComponent } from './home/user-welcome/user.welcome.component';
import { AuthGuardService } from './services/auth.guard.service';
import { GoogleLoginEaComponent } from './user/google-login-ea/google.login.ea.component';
import {AuthService} from './services/auth.service';
import {LoginPageComponent} from './user/login-page/login.page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserWelcomeComponent,
    SeriesComponent,
    SearchComponent,
    SeenbuttonComponent,
    FollowbuttonComponent,
    FanartPipe,
    FilterByPipe,
    LimitToPipe,
    RegisterUserComponent,
    PasswordRecoveryComponent,
    GoogleLoginEaComponent,
    LoginPageComponent,
    TestComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppSharedModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    WebStorageModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
      // progressBar: true
    })
  ],
  providers: [
    SeriesService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

