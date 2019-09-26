import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProdutoDTO } from '../_models/produto.dto';
import { ProdutoService } from '../_services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  bucketUrl: String = environment.bucketUrl;

  produto : any;

  id : Number = this.route.snapshot.params.id;

  constructor( private produtoService : ProdutoService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
    this.carregarProduto()
  }

  carregarProduto(){
    this.produtoService.findById(this.id).subscribe(res =>{
      this.produto = res;
    }, error => { });
  }

}
