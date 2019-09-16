import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components.module';
import { CidadeService } from '../_services/domain/cidade.service';
import { EstadoService } from '../_services/domain/estado.service';
import { SignupPage } from './signup.page';



const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignupPage],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class SignupPageModule { }
