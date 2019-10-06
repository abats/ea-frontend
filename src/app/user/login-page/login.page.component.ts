import { Component, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login.page.html',
  styleUrls: [
    'login.page.scss'
  ]
})

export class LoginPageComponent {
  submitted = false;
  loading = false;
  public state = '';
  public client_id = '';
  public googleRedirectURI = '';

  userModel = new User;

  constructor(
    private titleService: Title,
    private authService: AuthService,
  ) {
    titleService.setTitle('Episode Alert - Login');
    this.state = localStorage.getItem('eaState')
    this.client_id = '756279714032-9r0not6lpuhgcfd6p1e10b442gumo6qa.apps.googleusercontent.com';
    this.googleRedirectURI = 'http://www.episode-alert.com/login';
  }

  onSubmit() {
    console.log(this.userModel);
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
