import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../_models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalUser } from '../_models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService{

    jwtHelper = new JwtHelperService();

    constructor(private http : HttpClient, private storage: StorageService){
    }

    authenticate( creds : CredenciaisDTO){
        return this.http.post(`${environment.apiUrl}/login`, creds,{
            observe: 'response',
            responseType: 'text'
        });
    }

    refreshToken(){
        return this.http.post(`${environment.apiUrl}/auth/refresh_token`, {},{
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(authorizationValue : String){
        let token = authorizationValue.substring(7);
        let user : LocalUser = {
            token : token,
            email : this.jwtHelper.decodeToken(token).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}