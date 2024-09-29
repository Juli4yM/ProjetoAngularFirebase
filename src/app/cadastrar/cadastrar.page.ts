import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  constructor() { }

  criarConta(dados: any){
    console.log(dados);
    console.log(dados.nome);
    console.log(dados.email);
    console.log(dados.telefone);
  }

  ngOnInit() {
  }

}
