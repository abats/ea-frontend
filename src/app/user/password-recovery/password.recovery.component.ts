import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-passwordrecovery-page',
  templateUrl: 'password.recovery.component.html',
  styleUrls: [
    'password.recovery.component.scss'
  ]
})

export class PasswordRecoveryComponent implements OnInit {
  passwordRecoveryForm: FormGroup;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
  ) {
    titleService.setTitle('Episode Alert - Recover password');

    this.passwordRecoveryForm = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      }
      );
  }

  ngOnInit(): void {

  }

  onSubmit() {

    this.authService.registerEmailUser(this.passwordRecoveryForm.value)
      .then ( response => {
        console.log(response);
      })
      .catch( error => {
        console.log(error);
      });

    // Post to : http://www.episode-alert.com/api/auth/register
    // error response : {"flash":{"email":["The email has already been taken."]}} ?? Maybe more ??
    // {"flash":{"password":["The password must be at least 6 characters."]}}
    // {"flash":"Thanks for registering!"}
    // todo; implement the following in the callbacks
    // this.toaster.error('Email address is already in use', 'Registration error', {
    //     positionClass: 'toast-top-full-width'
    // });


  }

}
