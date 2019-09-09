import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/_services/domain/categoria.service';
import { CategoriaDTO } from 'src/app/_models/categoria.dto';
import {environment} from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];
  bucketUrl : String = environment.bucketUrl;

  constructor(private categoriaService : CategoriaService, private router : Router) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias(){
    this.categoriaService.findAll()
    .subscribe(res => {
      this.items = res;
    },
    error => {});
  }

  showProdutos(categoria_id : String){
    this.router.navigate(['/produtos'], { queryParams: { categoria_id : categoria_id } })
  }

}
