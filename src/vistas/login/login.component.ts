import {Component, OnInit} from '@angular/core';
import {getDefaultSession, handleIncomingRedirect, login} from "@inrupt/solid-client-authn-browser";
import { UserService } from '../../controlador/servicios/user.service';
import { User } from '../../modelo/User';

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

  constructor(private userService: UserService) { }

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
  
      try {
        // Obtener todos los usuarios
        const usuarios = await this.userService.obtenerUsuarios().toPromise();
        
        if (usuarios) { // Verificar que 'usuarios' no sea 'undefined'
          // Verificar si algún usuario tiene el mismo webId
          const usuarioExistente = usuarios.find(u => u.userName === this.webId);
          
          if (usuarioExistente) {
            // El usuario existe, guardamos su ID en localStorage
            localStorage.setItem('userId', usuarioExistente.id.toString());
            console.log('ID de usuario guardado en localStorage:', usuarioExistente.id);
          } else {
            console.log('El usuario no se encontró en la lista de usuarios.');
          }
        } else {
          console.log('No se pudo obtener la lista de usuarios.');
        }
      } catch (error) {
        console.error('Error al verificar o crear el usuario:', error);
      }
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
