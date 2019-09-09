import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../_models/produto.dto';
import { environment } from 'src/environments/environment';
import { ProdutoService } from '../_services/domain/produto.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[];
  
  bucketUrl : String = environment.bucketUrl;

  categoria_id = this.route.snapshot.queryParams.categoria_id;

  constructor(private produtoService : ProdutoService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.produtoService.findByCategoria(this.categoria_id)
        .subscribe(res =>{
          this.items = res['content'];
        }, error => {})
  }

}
