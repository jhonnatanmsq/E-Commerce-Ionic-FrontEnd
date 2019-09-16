import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProdutoDTO } from '../_models/produto.dto';
import { ProdutoService } from '../_services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  bucketUrl: String = environment.bucketUrl;

  categoria = this.route.snapshot.queryParams.categoria;
  lines = this.route.snapshot.queryParams.lines;
  nome = this.route.snapshot.queryParams.nome;

  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.carregarProdutos()
  }

  carregarProdutos() {
    this.lines = (typeof this.lines === 'undefined') ? 24 : this.lines;
    this.categoria = (typeof this.categoria === 'undefined') ? 0 : this.categoria;
    this.nome = (typeof this.nome === 'undefined') ? '' : this.nome;

    this.produtoService.findAll(this.lines, this.categoria, this.nome)
      .subscribe(res => {
        console.log(res)
        this.items = res['content'];
      }, error => { })
  }

  searchProd(nome?: any) {
    this.categoria = (typeof this.categoria === 'undefined') ? 0 : this.categoria;
    this.nome = (typeof this.nome === 'undefined') ? '' : nome.target.value;

    this.produtoService.findAll(24, this.categoria, this.nome)
      .subscribe(res => {
        this.items = res['content'];
        this.router.navigate(['/produtos'], { queryParams: { nome: this.nome } })
      }, error => { })
  }

}
