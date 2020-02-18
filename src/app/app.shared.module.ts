import { NgModule } from '@angular/core';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderBy, SearchPipe, UrlPipe } from './pipes';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    UserStatsComponent,
    SearchPipe,
    UrlPipe,
    OrderBy
  ],
  exports: [
    UserStatsComponent,
    CommonModule,
    FormsModule,
    SearchPipe,
    OrderBy,
    UrlPipe
  ]
})

export class AppSharedModule { }
