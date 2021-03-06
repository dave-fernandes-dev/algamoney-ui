import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  estados?: any[];
  estadoSelecionado: any;
  cidades?: any[];
  exibindoFormularioContato!: boolean;

  constructor(private errorHandler: ErrorHandlerService,
              private pessoaService: PessoaService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title
    ) {}
  ngOnInit(): void {
    this.title.setTitle('Novo Pessoa');

    this.carregarEstados();

    const id =this.route.snapshot.params['id'];

    if (id){
      this.loadPessoa(id);
      this.title.setTitle('Editar Pessoa');
    }
  }

  private loadPessoa(id: any) {
    this.pessoaService.buscarPorCodigo(id)
      .then(resultado => { this.pessoa = resultado;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco?.cidade?.estado?.id : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.id }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then(cidades => { this.cidades = cidades.map(c => ({ label: c.nome, value: c.id }));

                        if (this.estadoSelecionado !== this.pessoa.endereco?.cidade?.estado?.id) {
                          this.pessoa.endereco.cidade.id = null;
                        }
                      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  editando(){
    return Boolean(this.pessoa.id);
  }


  save(pessoaForm: NgForm) {
    if (this.editando()) {
      this.update(pessoaForm);
    } else {
      this.create(pessoaForm);
    }
  }

  create(_pessoaForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(objCreated => {
      this.messageService.add({severity:'success', detail:'Registro Criado com Sucesso!'});
      //lancamentoForm.reset();
      //this.lancamento = new Lancamento();
      this.router.navigate(['pessoas', objCreated.id]);

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  update(_pessoaForm: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
    .then((resultado:Pessoa) => {
      this.pessoa = resultado;
      this.messageService.add({severity:'success', detail:'Registro Atualizado com Sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm){
    form.reset(new Pessoa());
    this.router.navigate(['/pessoas/novo'])

  }
}
