import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routes';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
    Title,
    UserService
  ]
})
export class ProfileModule { }
