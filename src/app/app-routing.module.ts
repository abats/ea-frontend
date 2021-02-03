import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule, UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';
import { SeriesComponent } from './series/series.component';
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
    loadChildren: () => import('./browse/browse.module').then(m => m.BrowseModule)
  },
  {
    path: 'myshows',
    canActivate: [AuthGuard],
    data: { animation: 'HomePage' },
    loadChildren: () => import('./myshows/myshows.module').then(m => m.MyshowsModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'guide',
    canActivate: [AuthGuard],
    data: { animation: 'GuidePage' },
    loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule)
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

@Injectable()
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
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
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
