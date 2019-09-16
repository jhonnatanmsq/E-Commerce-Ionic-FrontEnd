import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';
import * as alertify from 'alertifyjs';
import { ClienteDTO } from './_models/cliente.dto';
import { AuthService } from './_services/auth.service';
import { ClienteService } from './_services/domain/cliente.service';
import { StorageService } from './_services/storage.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  cliente: ClienteDTO;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'list-box'
    },
    {
      title: 'Produtos',
      url: '/produtos',
      icon: 'pricetags'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router,
    private menu: MenuController,
    private storage: StorageService,
    private clienteService: ClienteService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(res => {
          this.cliente = res;
        }, error => { }
        );
    }
  }

  logout() {
    this.router.navigateByUrl('/home');
    this.auth.logout();
    alertify.message("Até mais!");
  }

  estaLogado() {
    return this.auth.estaLogado();
  }

  openEnd() {
    this.menu.open('login');
  }
}
