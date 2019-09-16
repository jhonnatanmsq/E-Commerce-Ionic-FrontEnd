import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaDTO } from 'src/app/_models/categoria.dto';
import { CategoriaService } from 'src/app/_services/domain/categoria.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];
  bucketUrl: String = environment.bucketUrl;

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.findAll()
      .subscribe(res => {
        this.items = res;
      },
        error => { });
  }

  showProdutos(categoria: String) {
    this.router.navigate(['/produtos'], { queryParams: { categoria: categoria } })
  }

}
