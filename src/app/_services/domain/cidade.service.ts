import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CidadeDTO } from 'src/app/_models/cidade.dto';

@Injectable()
export class CidadeService {

    urlBase = environment.apiUrl;

    constructor(private http : HttpClient){
    }

    findAll(estado_id : String) : Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${this.urlBase}/estados/${estado_id}/cidades`);
    }
}