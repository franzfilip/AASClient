import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: any = {
    username: '',
    password: ''
  };

  private returnTo: string = '';

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.auth.login(this.login.username, this.login.password)) {
      this.router.navigateByUrl("/clientinstances");
    } else {
      // TODO error message
    }
  }
}
