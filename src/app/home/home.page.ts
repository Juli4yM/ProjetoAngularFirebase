
import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;

  constructor(
    private _auth: AuthenticateService,
    private menuCtrl: MenuController
   ){ 
    // Verifica se o usuário está autenticado ao carregar a página
    this.user = this._auth.getUserData();
   }

   logout() {
    this._auth.logout();
    this.user = null;  // Atualizar para remover o estado do usuário logado
  };


  redirecionarParaInstagram() {
    window.location.href = 'https://www.instagram.com/s_tudiomk/';
  };

  redirecionarParaWhats() {
    window.location.href = 'https://wa.me/+5515997008641/?text=Ola';
  };

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  };

  openEndMenu() {
    /**
     * Open the menu by side
     * We can refer to the menu by side
     * here because only one "end" menu exists
     */
    this.menuCtrl.open('end');
  }

}
