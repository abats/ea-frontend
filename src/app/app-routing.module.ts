import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule, UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './user/register-user/register.user.component';
import { PasswordRecoveryComponent } from './user/password-recovery/password.recovery.component';
import { AuthGuardService as AuthGuard } from './services/auth.guard.service' ;
import { LoginPageComponent } from './user/login-page/login.page.component';
import { ContactComponentComponent } from './contact-component/contact-component.component';

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
    loadChildren: './browse/browse.module#BrowseModule'
  },
  {
    path: 'myshows',
    canActivate: [AuthGuard],
    data: { animation: 'HomePage' },
    loadChildren: './myshows/myshows.module#MyshowsModule'
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'guide',
    canActivate: [AuthGuard],
    data: { animation: 'GuidePage' },
    loadChildren: './guide/guide.module#GuideModule'
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
  },
  {
    path: 'contact',
    data: { animation: 'HomePage' },
    component: ContactComponentComponent
  },
];

export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {
    const dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }
  serialize(tree: UrlTree): any {
    const dus = new DefaultUrlSerializer(),
      path = dus.serialize(tree);
    return path;
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
