import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( ){ }

  redirecionarParaInstagram() {
    window.location.href = 'https://www.instagram.com/s_tudiomk/';
  }

  redirecionarParaWhats() {
    window.location.href = 'https://wa.me/+5515997008641/?text=Ola';
  }

}
