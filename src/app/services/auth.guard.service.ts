import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService) {}

  canActivate(): boolean {
    console.log('check if we can go');
    if (!this.authService.isLoggedIn()) {
      this.toaster.error('Please login or register to access this page', 'Not logged in', {
        positionClass: 'toast-top-full-width'
      })
      this.router.navigate(['register']);
      return false;
    }
    return true;
  }

}
