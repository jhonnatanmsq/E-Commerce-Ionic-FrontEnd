import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ClienteDTO } from '../_models/cliente.dto';
import { ClienteService } from '../_services/domain/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente : ClienteDTO;

  constructor(private router: Router, private storage : StorageService, private clienteService : ClienteService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(res => {
          this.cliente = res;
        }, error => {
          if(error.status == 403){
            this.router.navigate(['/home']);
          }
        });
    }else{
      this.router.navigate(['/home']);
    }
  }

}
