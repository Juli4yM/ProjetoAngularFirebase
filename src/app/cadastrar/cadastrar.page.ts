
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  constructor(
    private _auth: AuthenticateService
  ) { }

  criarConta(dados: any) {
    this._auth.verify(dados.email);
    // this._auth.register(dados.email, dados.password)
  }

  ngOnInit() {
  }

}
