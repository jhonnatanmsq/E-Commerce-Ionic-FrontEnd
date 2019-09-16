import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as alertify from 'alertifyjs';
import { CredenciaisDTO } from '../_models/credenciais.dto';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(private router: Router, private menu: MenuController, private auth: AuthService) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        alertify.success("Logado com sucesso!");
        this.router.navigate(['/home']);
      })
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        alertify.success("Logado com sucesso!");
        this.router.navigateByUrl('/home');
      })
  }

}
