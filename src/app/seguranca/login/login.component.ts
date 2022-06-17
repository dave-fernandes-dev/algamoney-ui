import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private errorHandler: ErrorHandlerService, private messageService: MessageService, private router: Router) { //vazio
   }

  ngOnInit(): void {
    //vazio
  }

  login(usuario: string, senha: string){
    this.auth.login(usuario,senha)
    .then( () => {
      this.messageService.add({severity:'success', detail:'Autenticado com Sucesso!'});
      this.router.navigate(['/lancamentos']);
    })
     .catch(erro => this.errorHandler.handle(erro));
  }



  login2(_form: NgForm){
    //vazio
  }

}
