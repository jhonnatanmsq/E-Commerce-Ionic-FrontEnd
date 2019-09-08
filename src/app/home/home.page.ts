import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../_models/credenciais.dto';
import { AuthService } from '../_services/auth.service';

import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  }

  constructor(private router: Router, private menu : MenuController, private auth : AuthService) {}

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        alertify.success("Logado com sucesso!");
        this.router.navigate(['/categorias']);
      })
  }

  ionViewWillEnter(){
    this.menu.enable(false);
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        alertify.success("Logado com sucesso!");
        this.router.navigate(['/categorias']);
      })
  }

}
