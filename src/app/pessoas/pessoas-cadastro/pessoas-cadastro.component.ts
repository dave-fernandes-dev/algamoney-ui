import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.scss']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    ) {}
  ngOnInit(): void {
    //temp
  }

  salvar(pessoaForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({severity:'success', detail:'Registro salvo com Sucesso!'});
      pessoaForm.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
