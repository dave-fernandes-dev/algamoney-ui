import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // constructor() { //vazio
  //  }

  ngOnInit(): void {
    //vazio
  }

  login(_usuario: string, _senha:string){
    //vazio
  }

  login2(_form: NgForm){
    //vazio
  }

}
