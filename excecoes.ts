class AplicacaoError extends Error {
    constructor(message: string){
        super(message);
    }
}

class ContaInexistenteError extends AplicacaoError {
    constructor(message: string){
        super(message);
    }
}

class SaldoInsuficienteError extends AplicacaoError {
    constructor(message: string){
        super(message);
    }
}

class ValorInvalidoError extends AplicacaoError {
    constructor(message: string){
        super(message);
    }
}

class PoupancaInvalidaError extends AplicacaoError {
    constructor(message: string){
        super(message);
    }
}

class OpcaoInvalidaError extends AplicacaoError {
    constructor(message: string){
        super(message);
    }
}

export { AplicacaoError, ContaInexistenteError, SaldoInsuficienteError, ValorInvalidoError,
PoupancaInvalidaError, OpcaoInvalidaError };