import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean = false;
  usuarioLogado: string = '';

  constructor(private auth: AuthService) { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
       /* TODO document why this method 'ngOnInit' is empty */
    this.usuarioLogado = this.auth.jwtPayLoad?.nome;
  }

}
