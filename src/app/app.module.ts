import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CategoriaService } from 'src/app/_services/domain/categoria.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorProvider } from './_interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from './_interceptors/error-interceptor';
import { AuthService } from './_services/auth.service';
import { ClienteService } from './_services/domain/cliente.service';
import { ProdutoService } from './_services/domain/produto.service';
import { StorageService } from './_services/storage.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


