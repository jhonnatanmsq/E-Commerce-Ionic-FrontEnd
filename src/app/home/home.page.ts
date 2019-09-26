import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoriaDTO } from '../_models/categoria.dto';
import { ProdutoDTO } from '../_models/produto.dto';
import { CategoriaService } from '../_services/domain/categoria.service';
import { ProdutoService } from '../_services/domain/produto.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  produtos: ProdutoDTO[];
  categorias: CategoriaDTO[];
  bucketUrl: String = environment.bucketUrl;

  constructor(private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router) { }

  ngOnInit() {
    this.carregarHome();
  }

  carregarHome() {
    this.produtoService.findAll(10)
      .subscribe(res => {
        this.produtos = res['content'];
      },
        error => { });

    this.categoriaService.findAll()
      .subscribe(res => {
        this.categorias = res;
      })
  }

  showAllProdutos() {
    this.router.navigate(['/produtos'])
  }

  showProdCat(id: Number) {
    this.router.navigate(['/produtos'], { queryParams: { categoria: id } })
  }

  search(nome?: any) {
    this.router.navigate(['/produtos'], { queryParams: { nome: nome.target.value } })
  }

  productEnter(id: Number){
    this.router.navigate(['/produto/', id])
  }

}
