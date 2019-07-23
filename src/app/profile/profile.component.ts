import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/model/user';
import { UserProfile } from 'src/app/model/userProfile';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { PasswordValidation } from './profile.component.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userModel = new User;
  changeProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  changeNotificationsForm: FormGroup;
  isThirdParty: boolean;
  userProfile = new UserProfile;
  userProfile$ = new Subscription;

  constructor(
      private titleService: Title,
      private authService: AuthService,
      private userService: UserService,
      private formBuilder: FormBuilder,
      private toaster: ToastrService
  ) {
      titleService.setTitle('Episode Alert - Profile');

      this.changeNotificationsForm = formBuilder.group( {
        alerts: [''],
        publicfollow: ['']
      });

      this.changeProfileForm = formBuilder.group({
              email: ['', [Validators.required, Validators.email]],
              password: ['', Validators.required],
              accountname: ['', Validators.required]
        }
      );
      this.changePasswordForm = formBuilder.group({
          currentPassword: ['', [Validators.required]],
          newPassword: ['', Validators.required],
          verifyPassword: ['', Validators.required]
          },
          {
              validator: PasswordValidation.MatchPassword // your validation method
          }
      );
   }

  ngOnInit() {
    this.isThirdParty = this.authService.isThirdParty();
    this.userProfile$ = this.userService.getUserProfile().subscribe(results => {
      this.userProfile = results;
      this.setProfileDefaultValue(results);
    });
  }

  ngOnDestroy() {
    this.userProfile$.unsubscribe();
  }

  setProfileDefaultValue(userProfile) {
    let alertValue: boolean;
    if (this.userProfile.alerts === '0') {
      alertValue = false;
    } else if (this.userProfile.alerts === '1' ) {
      alertValue = true;
    }

    this.changeProfileForm.patchValue({email: userProfile.email, accountname: userProfile.accountname, password: null});
    this.changeNotificationsForm.patchValue( {alerts: alertValue, publicfollow: false});
  }

  changeProfile() {
    // possible responses from current backend
    // {"flash":"Invalid data.","accountname":"<account-name>","email":"<email>"}
    // {"flash":"Your changes have been saved.","accountname":"<account-name>","email":"<email>"}

    this.userService.changeUserProfile(this.changeProfileForm.value)
      .then ( response => {
        this.toaster.success((<any>response).flash, 'Update successful', {
            positionClass: 'toast-top-full-width'
        });

        // setTimeout( () => {
        //   this.router.navigateByUrl('/');
        // }, 8000);

      })
      .catch( error => {
        this.toaster.error(error.flash, 'Error trying to register', {
          positionClass: 'toast-top-full-width'
        });

      });

  }

  changeNotifications() {
    this.userService.changeUserPreferences(this.changeNotificationsForm.value)
      .then( response => {
        this.toaster.success((<any>response).flash, 'Update successful', {
          positionClass: 'toast-top-full-width'
        });
      });
  }
}
