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
