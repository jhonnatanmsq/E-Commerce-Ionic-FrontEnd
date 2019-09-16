import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoDTO } from 'src/app/_models/estado.dto';
import { environment } from 'src/environments/environment';

@Injectable()
export class EstadoService {

    urlBase = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${this.urlBase}/estados/`);
    }
}