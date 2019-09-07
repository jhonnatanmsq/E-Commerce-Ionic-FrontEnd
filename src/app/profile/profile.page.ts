import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ClienteDTO } from '../_models/cliente.dto';
import { ClienteService } from '../_services/domain/cliente.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente : ClienteDTO;

  constructor( private storage : StorageService, private clienteService : ClienteService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(res => {
          this.cliente = res;
        }, error => {});
    }
  }

}
