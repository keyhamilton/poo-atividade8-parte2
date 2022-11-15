import { Conta, ContaImposto, Poupanca } from "./conta";
import { AplicacaoError, ContaInexistenteError, PoupancaInvalidaError } from "./excecoes";

class Banco {
    private _contas: Conta[] = [];

    public consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let c of this._contas) {
            if (c.numero == numero) {
            contaProcurada = c;
            break;
            }
        }
        if(contaProcurada == null){
            throw new ContaInexistenteError('Conta inexistente.');
        }
        return contaProcurada;
    };

    public inserir(conta: Conta): void {
        let achou: boolean = false;
        try {
            let c = this.consultar(conta.numero);
            achou = true;
        } catch (error) {
            this._contas.push(conta); 
        }
        if(achou){
            throw new AplicacaoError('Conta já existe.');
        }
        
    };


    private consultarIndice(numero: string): number {
        let indice: number = -1;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
            indice = i;
            break;
            }
        }
        if(indice == -1){
            throw new ContaInexistenteError('Conta inexistente.');
        }
        return indice;
    };


    public alterar(c: Conta): void {
        let indice = this.consultarIndice(c.numero);

        this._contas[indice] = c;
        
    };

    public excluir(numero: string): void {
        let indice: number = this.consultarIndice(numero);
        for (let i: number = indice; i < this._contas.length; i++) {
            this._contas[i] = this._contas[i + 1];
        }
        this._contas.pop();
    };

    public sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if (conta instanceof ContaImposto) {
            (<ContaImposto>conta).debitar(valor)
        }
        else{
            conta.sacar(valor);
        }
    };

    public depositar(numero: string, valor: number) {
        let conta: Conta = this.consultar(numero);
        conta.depositar(valor);
    
    };

    public transfeir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numeroOrigem);
        let contaDestino: Conta = this.consultar(numeroDestino);

        contaOrigem.transferir(contaDestino, valor);

    };

    get contas(): number {
        return this._contas.length;
    };

    public somaSaldos(): number {
        let soma: number = 0;
        for (let i = 0; i < this._contas.length; i++) {
            soma += this._contas[i].saldo; 
        }
        return soma;
    };

    public calcularMedia(): number {
        if(this.contas) {
            return this.somaSaldos()/this.contas;
        };
        return 0;
    };

    public renderJuros(numero: string): number {
        let conta: Conta = this.consultar(numero);
        if(conta instanceof Poupanca) {
            (<Poupanca>conta).renderJuros();
            return conta.saldo;
        }
        throw new PoupancaInvalidaError('Conta inválida. A conta não é poupança.')
    }

    public debitar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        if(conta instanceof ContaImposto) {
            (<ContaImposto>conta).debitar(valor)
        }
    }
}

export { Banco };