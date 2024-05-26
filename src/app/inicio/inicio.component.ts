import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session, login, handleIncomingRedirect, getDefaultSession } from '@inrupt/solid-client-authn-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  selectedIdP: string = '';
  webId: string = '';
  isLoggedIn: boolean = false;
  selectedPod: string = '';

  constructor(private router: Router) { }

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

    // Implementar lógica para obtener los PODs del usuario
    // Debes importar y utilizar las funciones correspondientes de Solid-client
  }

  handleWebIdChange(event: any) {
    this.webId = event.target.value;
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    console.log('WebID submitted:', this.webId);
    // Usar Router.navigate para navegar a la siguiente página
    this.router.navigate(['/principal'], { state: { webId: this.webId } });
  }
}
