import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDTO } from 'src/app/_models/categoria.dto';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoriaService {

    urlBase = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${this.urlBase}/categorias`);
    }
}