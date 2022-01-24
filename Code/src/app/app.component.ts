import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AAAS';

  constructor(private oauthService: OAuthService, public authenticationService: AuthenticationService){
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    //--- tryLogin wird zusätzlich gebraucht um sich beim Server anmelden zu können - obiger Code hat in der Übung jedoch funktioniert, Konfigurationsfehler OAuth
    this.oauthService.tryLogin();
  }
}
