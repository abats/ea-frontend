import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyshowsComponent } from './myshows.component';

export const routes: Routes = [
  { path: '', component: MyshowsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyshowRoutingModule {
}
