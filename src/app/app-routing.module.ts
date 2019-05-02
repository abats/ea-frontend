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
const routes: Routes = [
  {
    path: 'series/:uniqueName',
    component: SeriesComponent
  },
  {
    path: 'series/genre/:genre',
    data: { animation: 'HomePage' },
    loadChildren: () => BrowseModule
  },
  {
    path: 'myshows',
    data: { animation: 'HomePage' },
    loadChildren: () => MyshowsModule
  },
  {
    path: 'profile',
    loadChildren: () => ProfileModule
  },
  {
    path: 'guide',
    data: { animation: 'GuidePage' },
    loadChildren: () => GuideModule
  },
  {
    path: 'register',
    data: { animation: 'GuidePage' },
    component: RegisterUserComponent
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
