import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClienteDTO } from '../_models/cliente.dto';
import { ClienteService } from '../_services/domain/cliente.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  bucketUrl: String = environment.bucketUrl;

  cliente: ClienteDTO;

  constructor(private router: Router, private storage: StorageService, private clienteService: ClienteService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(res => {
          this.cliente = res;
        }, error => {
          if (error.status == 403) {
            this.router.navigate(['/login']);
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

}
