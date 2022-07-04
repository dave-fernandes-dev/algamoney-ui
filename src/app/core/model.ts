export class Pessoa {
  id?: number;
  nome?: string;
  ativo?: boolean = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}

export class Contato {
  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;

  constructor(id?: number, nome?: string, email?: string, telefone?: string) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
  }
}

export class Endereco {
  bairro?: string;
  cep?: string;
  cidade?: string;
  complemento?: string;
  estado?: string;
  logradouro!: string;
  numero?: string;
}

export class Categoria {
  id?: number;
}

export class Lancamento {
  id?: number;
  tipo? = 'RECEITA';
  descricao?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  valor?: number;
  observacao?: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
