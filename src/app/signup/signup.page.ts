import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { CidadeDTO } from '../_models/cidade.dto';
import { EstadoDTO } from '../_models/estado.dto';
import { CidadeService } from '../_services/domain/cidade.service';
import { ClienteService } from '../_services/domain/cliente.service';
import { EstadoService } from '../_services/domain/estado.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(private fromBuilder: FormBuilder,
    private router: Router,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private clienteService: ClienteService) {

    this.formGroup = this.fromBuilder.group({
      nome: ['Joesley', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['jao@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['123', [Validators.required]],
      numero: ['123', [Validators.required]],
      complemento: ['123', []],
      bairro: ['123', []],
      cep: ['123', [Validators.required]],
      telefone1: ['123', Validators.required],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: ['1', [Validators.required]],
      cidadeId: ['', [Validators.required]]
    });
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(res => {
        alertify.success("Cliente cadastrado com sucesso!");

        this.router.navigate(['/home']);
      }, error => { })
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(res => {
        this.cidades = res;
        this.formGroup.controls.cidadeId.setValue(null);
      }, error => { })
  }

  ngOnInit() {
    this.estadoService.findAll()
      .subscribe(res => {
        this.estados = res;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      }, error => { })
  }

}
