import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdutoService{

    constructor(private http : HttpClient){}

    findByCategoria(categoria_id : String){
        return this.http.get(`${environment.apiUrl}/produtos/?categorias=${categoria_id}`)
    }
}