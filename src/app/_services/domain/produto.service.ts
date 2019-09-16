import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient) { }

    findAll(lines?: Number, categorias?: Number, nome?: any) {

        lines = (typeof lines === 'undefined') ? 24 : lines;
        categorias = (typeof categorias === 'undefined') ? 0 : categorias;
        nome = (typeof nome === 'undefined') ? '' : nome;

        return this.http.get(`${environment.apiUrl}/produtos/?categorias=${categorias}&nome=${nome}&lines=${lines}&orderBy=id`);

    }
}