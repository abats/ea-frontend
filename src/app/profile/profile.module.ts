import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routes';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    TabsModule.forRoot()
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
    Title,
    AuthService,
    UserService
  ]
})
export class ProfileModule { }
