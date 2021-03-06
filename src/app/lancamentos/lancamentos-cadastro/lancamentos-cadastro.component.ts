import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss'],
})
export class LancamentosCadastroComponent implements OnInit {

  categorias: any[] = [];
  pessoas: any[] = [];
  lancamento = new Lancamento();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(private categoriaService: CategoriaService,
              private errorHandler: ErrorHandlerService,
              private pessoaService: PessoaService,
              private messageService: MessageService,
              private lancamentoService: LancamentoService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title
              ) {}


  ngOnInit(): void {
    this.title.setTitle('Novo Lancamento');

    const id =this.route.snapshot.params['id'];

    if (id){
      this.loadLancamento(id);
      this.title.setTitle('Editar Lancamento');
    }

    this.loadCategorias();
    this.loadPessoas();
  }

  private loadLancamento(id: any) {
    this.lancamentoService.buscarPorCodigo(id)
      .then(resultado => this.lancamento = resultado)
      .catch(erro => this.errorHandler.handle(erro));
  }

  editando(){
    return Boolean(this.lancamento.id);
  }

  save(lancamentoForm: NgForm) {
    if (this.editando()) {
      this.update(lancamentoForm);
    } else {
      this.create(lancamentoForm);
    }
  }

  create(_lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(objCreated => {
      this.messageService.add({severity:'success', detail:'Registro Criado com Sucesso!'});
      //lancamentoForm.reset();
      //this.lancamento = new Lancamento();
      this.router.navigate(['lancamentos', objCreated.id]);

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  update(_lancamentoForm: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
    .then((resultado:Lancamento) => {
      this.lancamento = resultado;
      this.messageService.add({severity:'success', detail:'Registro Atualizado com Sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  loadCategorias() {
    return this.categoriaService.listarTodas()
      .then( itens => {
         this.categorias = itens.map((c: any) => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  loadPessoas() {
    return this.pessoaService.listarTodas2()
      .then( itens => {
         this.pessoas = itens.map((c: any) => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm){
    form.reset(new Lancamento());
    this.router.navigate(['/lancamentos/novo'])

  }

  get uploadHeaders() {
    return this.lancamentoService.uploadHeaders();
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }


}
