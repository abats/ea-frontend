import { Component, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
    selector: 'app-login-form',
    templateUrl: 'login.html',
    styleUrls: [
        'login.scss'
    ]
})

export class LoginComponent {
    modalRef: BsModalRef;
    submitted = false;
    loading = false;

    userModel = new User;

    constructor(
        private titleService: Title,
        private authService: AuthService,
        private modalService: BsModalService
    ) {
        titleService.setTitle('Episode Alert - Login');

    }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

    onSubmit() {
        this.submitted = true;
        this.login();
    }

    login() {
        this.loading = true;

        const userCredentials = {
            email : this.userModel.name ,
            password : this.userModel.password
        };

        this.authService.loginUser(userCredentials)
            .then((authInfo) => {
              console.log(authInfo);
        });

    }

}
