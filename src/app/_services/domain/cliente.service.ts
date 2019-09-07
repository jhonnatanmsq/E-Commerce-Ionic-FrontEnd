import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/app/_models/cliente.dto';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService {

    urlBase = environment.apiUrl;

    constructor(private http : HttpClient, private storage : StorageService){
    }

    findByEmail(email : String) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${this.urlBase}/clientes/email?value=${email}`);
    }
}