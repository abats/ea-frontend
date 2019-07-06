import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PasswordValidation } from './register.user.component.validator';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register-page',
    templateUrl: 'register.user.component.html',
    styleUrls: [
        'register.user.component.scss'
    ]
})

export class RegisterUserComponent implements OnInit {
    userModel = new User;
    registerForm: FormGroup;

    constructor(
        private titleService: Title,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private toaster: ToastrService,
        private router: Router
    ) {
        titleService.setTitle('Episode Alert - Register');

        this.registerForm = formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                password_confirmation: ['', Validators.required]
            },
            {
                validator: PasswordValidation.MatchPassword // your validation method
            }
        );
    }

    ngOnInit(): void {

    }

    onSubmit() {
      // possible responses from current backend
      // responses : {"flash":{"email":["The email has already been taken."]}} ?? Maybe more ??
      // {"flash":{"password":["The password must be at least 6 characters."]}}
      // {"flash":"Thanks for registering!"}

      this.authService.registerEmailUser(this.registerForm.value)
        .then ( response => {
          this.toaster.success('You registered successfully to episode-alert, we are redirecting you back to the homepage ' +
            'where you can start following some series', 'Registration successful', {
              positionClass: 'toast-top-full-width'
          });

          setTimeout( () => {
            this.router.navigateByUrl('/');
          }, 8000);

        })
        .catch( error => {
          this.toaster.error(error.flash, 'Error trying to register', {
            positionClass: 'toast-top-full-width'
          });

        });

    }

}
