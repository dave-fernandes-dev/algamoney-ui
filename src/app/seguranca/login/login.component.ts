import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private errorHandler: ErrorHandlerService) { //vazio
   }

  ngOnInit(): void {
    //vazio
  }

  login(usuario: string, senha: string){
    this.auth.login(usuario,senha)
    .then()
    .catch(erro => this.errorHandler.handle(erro));
  }



  login2(_form: NgForm){
    //vazio
  }

}
