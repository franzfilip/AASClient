import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router, private oauthService: OAuthService) { }

  login(username: string = "", password: string = ""): boolean {
    this.oauthService.initImplicitFlow()
    return true;
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  logOut(){
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }


}
