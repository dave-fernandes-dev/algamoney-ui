import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro-reativo',
  templateUrl: './lancamento-cadastro-reativo.component.html',
  styleUrls: ['./lancamento-cadastro-reativo.component.scss'],
})
export class LancamentoCadastroReativoComponent implements OnInit {

  categorias = [];
  pessoas = [];
  //lancamento = new Lancamento();
  form!: FormGroup;
  uploadEmAndamento = false;

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
              private title: Title,
              private formBuilder: FormBuilder,
              ) {}

  ngOnInit(): void {

    this.configForm();

    const id =this.route.snapshot.params['id'];

    this.title.setTitle('Novo Lancamento');

    if (id){
      this.loadLancamento(id);
      this.title.setTitle('Editar Lancamento');
    }

    this.loadCategorias();
    this.loadPessoas();
  }

  antesUploadAnexo(_event:any) {
    this.uploadEmAndamento = true;
  }

  get uploadHeaders() {
    return this.lancamentoService.uploadHeaders();
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  aoTerminarUploadAnexo(event:any) {
    const anexo = event.originalEvent.body;
    //console.log(anexo)
    this.form.patchValue({ anexo: anexo.nome,  urlAnexo: anexo.url });
    this.uploadEmAndamento = false;
  }

  erroUpload(_event: any) {
    this.uploadEmAndamento = false;
    this.messageService.add({severity:'error', detail:'Erro ao tentar enviar anexo!'});
    //console.log(_event)

  }

  removerAnexo() {
    this.form.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    //console.log('nomeAnexo')
    const nome = this.form?.get('anexo')?.value;
    //console.log(nome)
    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }


  private loadLancamento(id: any) {
    this.lancamentoService.buscarPorCodigo(id)
    //.then(resultado => this.form.setValue(resultado))
    .then(resultado => this.form.patchValue(resultado))  //con patchvalue so mapeia o q necessario
    .catch(erro => this.errorHandler.handle(erro));
  }

  editando(){
    return Boolean(this.form.get('id')?.value);
  }

  save() {
    if (this.editando()) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.lancamentoService.adicionar(this.form.value)
    .then(objCreated => {
      this.messageService.add({severity:'success', detail:'Registro Criado com Sucesso!'});
      this.router.navigate(['lancamentos', objCreated.id]);

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  update() {
    this.lancamentoService.atualizar(this.form.value)
    .then((resultado:Lancamento) => {
      //this.form.setValue(resultado);  total
      this.form.patchValue(resultado);  //parcial
      this.messageService.add({severity:'success', detail:'Registro Atualizado com Sucesso!'});
    })
    .catch(erro => {this.errorHandler.handle(erro)
      //console.log('linha116', erro)
    });
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

  novo(){
    this.form.reset(new Lancamento());
    this.router.navigate(['/lancamentos/novo'])
  }

  mudarUpload(){
    this.uploadEmAndamento = !this.uploadEmAndamento
  }





  configForm(){
    this.form = this.formBuilder.group({
      id: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
        pessoa: this.formBuilder.group({
          id: [null, Validators.required],
          nome: []
        }),
        categoria: this.formBuilder.group({
          id: [null, Validators.required],
          nome: []
        }),
        observacao: [],
        anexo: [],
        urlAnexo: []
    });
  }



}
