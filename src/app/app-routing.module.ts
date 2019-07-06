import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { BrowseModule } from './browse/browse.module';
import { MyshowsModule } from './myshows/myshows.module';
import { ProfileModule } from './profile/profile.module';
import { GuideModule } from './guide/guide.module';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './user/register-user/register.user.component';
import { PasswordRecoveryComponent } from './user/password-recovery/password.recovery.component';
import { AuthGuardService as AuthGuard } from './services/auth.guard.service' ;
import { LoginPageComponent } from './user/login-page/login.page.component';

const routes: Routes = [
  {
    path: 'series/:uniqueName',
    component: SeriesComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'series/genre/:genre',
    data: { animation: 'HomePage' },
    loadChildren: () => BrowseModule
  },
  {
    path: 'myshows',
    canActivate: [AuthGuard],
    data: { animation: 'HomePage' },
    loadChildren: () => MyshowsModule
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => ProfileModule
  },
  {
    path: 'guide',
    canActivate: [AuthGuard],
    data: { animation: 'GuidePage' },
    loadChildren: () => GuideModule
  },
  {
    path: 'register',
    data: { animation: 'GuidePage' },
    component: RegisterUserComponent
  },
  {
    path: 'password-recovery',
    data: { animation: 'GuidePage' },
    component: PasswordRecoveryComponent
  },
  {
    path: '',
    data: { animation: 'HomePage' },
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule { }
