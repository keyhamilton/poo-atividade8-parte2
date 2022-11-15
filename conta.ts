import {SaldoInsuficienteError, ValorInvalidoError} from './excecoes'

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldo: number){
        this.validarValor(saldo)
        this._saldo = saldo;
        this._numero = numero;
        
    }

    get numero(): string {
        return this._numero;
    }

    get saldo(): number {
        return this._saldo;
    }

    private validarValor(valor: number){
        if(valor <=0){
            throw new ValorInvalidoError("Valor inválido. Valor negativo ou nulo.");
        }
    }

    

    public sacar(valor: number): void {

        this.validarValor(valor);
        if(valor > this._saldo){
            throw new SaldoInsuficienteError('Saldo insuficiente.');
        }
        this._saldo = this._saldo - valor;
    }

    public depositar(valor: number): void {
        this.validarValor(valor);
		this._saldo = this._saldo + valor;
	}

    public transferir(contaDestino: Conta, valor: number){
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}

class Poupanca extends Conta {
    private _taxaJuros: number;

    constructor(numero: string, saldo: number, taxaJuros: number) {
        super(numero, saldo);
        this._taxaJuros = taxaJuros;
    };

    get taxaJuros(): number {
        return this._taxaJuros;
    };

    public renderJuros(): void {
        this.depositar(this.saldo * (this._taxaJuros/100))
    }
}

class ContaImposto extends Conta {
    private _taxaDesconto: number;

    constructor(numero: string, saldo: number, taxaDesconto: number) {
        super(numero, saldo);
        this._taxaDesconto = taxaDesconto;
    }

    get taxaDesconto(): number {
        return this._taxaDesconto;
    }

    public debitar(valor: number): void {
        let total = valor + valor * (this._taxaDesconto/100);
        super.sacar(total);
    }
}

export { Conta, ContaImposto, Poupanca };

