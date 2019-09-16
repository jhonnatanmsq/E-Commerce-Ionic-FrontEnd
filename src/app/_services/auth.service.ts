import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { CredenciaisDTO } from '../_models/credenciais.dto';
import { LocalUser } from '../_models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient, private storage: StorageService) {
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${environment.apiUrl}/login`, creds, {
            observe: 'response',
            responseType: 'text'
        });
    }

    refreshToken() {
        return this.http.post(`${environment.apiUrl}/auth/refresh_token`, {}, {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(authorizationValue: String) {
        let token = authorizationValue.substring(7);
        let user: LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }

    estaLogado() {
        let localUser = this.storage.getLocalUser();
        if (localUser) {
            return !this.jwtHelper.isTokenExpired(localUser.token);
        }
    }
}