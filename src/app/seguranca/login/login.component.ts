import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { //vazio
   }

  ngOnInit(): void {
    //vazio
  }

  login(usuario: string, senha:string){
    this.auth.login(usuario,senha);
  }

  login2(_form: NgForm){
    //vazio
  }

}
