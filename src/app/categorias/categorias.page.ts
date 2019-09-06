import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];
  bucketUrl : String = environment.bucketUrl;

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias(){
    this.categoriaService.findAll()
    .subscribe(res => {
      this.items = res;
    },
    error => {
      console.log(error)
    });
  }

}
