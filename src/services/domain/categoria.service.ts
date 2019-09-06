import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CategoriaDTO } from 'src/models/categoria.dto';

@Injectable()
export class CategoriaService {

    urlBase = environment.apiUrl;

    constructor(private http : HttpClient){
    }

    findAll() : Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(`${this.urlBase}/categorias`);
    }
}