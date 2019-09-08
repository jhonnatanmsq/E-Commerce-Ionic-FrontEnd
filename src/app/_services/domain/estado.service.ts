import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EstadoDTO } from 'src/app/_models/estado.dto';

@Injectable()
export class EstadoService {

    urlBase = environment.apiUrl;

    constructor(private http : HttpClient){
    }

    findAll() : Observable<EstadoDTO[]>{
        return this.http.get<EstadoDTO[]>(`${this.urlBase}/estados/`);
    }
}