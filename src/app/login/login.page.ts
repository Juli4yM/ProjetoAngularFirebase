import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  logarConta(dados: any){
    console.log(dados);
    console.log(dados.email);
    console.log(dados.password);
  }

  ngOnInit() {
  }

}
