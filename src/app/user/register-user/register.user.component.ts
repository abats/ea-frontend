import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PasswordValidation } from './register.user.component.validator';

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
        private toaster: ToastrService
    ) {
        titleService.setTitle('Episode Alert - Register');

        this.registerForm = formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            },
            {
                validator: PasswordValidation.MatchPassword // your validation method
            }
        );
    }

    ngOnInit(): void {

    }

    onSubmit() {

        // Post to : http://www.episode-alert.com/api/auth/register
        // error response : {"flash":{"email":["The email has already been taken."]}} ?? Maybe more ??
        // {"flash":{"password":["The password must be at least 6 characters."]}}
        // {"flash":"Thanks for registering!"}
        // todo; implement the following in the callbacks
        this.toaster.error('Email address is already in use', 'Registration error', {
            positionClass: 'toast-top-full-width'
        });

        console.log(this.registerForm);
    }

}
