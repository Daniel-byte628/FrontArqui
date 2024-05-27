import {Component, OnInit} from '@angular/core';
import {getDefaultSession, handleIncomingRedirect, login} from "@inrupt/solid-client-authn-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  selectedIdP: string = '';
  webId: string = '';
  isLoggedIn: boolean = false;
  selectedPod: string = '';

  constructor() { }

  ngOnInit(): void {
    this.handleRedirectAfterLogin();
  }

  async handleLogin() {
    await this.loginToSelectedIdP(this.selectedIdP);
  }

  async handleRedirectAfterLogin() {
    await handleIncomingRedirect();

    const session = getDefaultSession();

    if (session.info.isLoggedIn && session.info.webId) {
        this.webId = session.info.webId;
        await this.getMyPods(session.info.webId);
        this.isLoggedIn = true;
        localStorage.setItem('webId', this.webId);
    }
}



  async loginToSelectedIdP(selectedIdP: string) {
    try {
      await login({
        oidcIssuer: selectedIdP,
        redirectUrl: window.location.href,
        clientName: 'Getting started app'
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async getMyPods(webId: string) {
    if (!webId) {
      console.error('WebID is not defined.');
      return;
    }

  }

  handleWebIdChange(event: any) {
    this.webId = event.target.value;
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    console.log('WebID submitted:', this.webId);
    this.isLoggedIn = true;
  }

}
