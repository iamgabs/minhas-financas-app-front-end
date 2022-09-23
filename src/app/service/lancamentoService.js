import ApiService from "../apiservice";
import ErroValidacao  from "../exception/erroValidacao"

export default class LancamentoService extends ApiService {
    constructor(){
        super('/api/lancamentos')
    }

    obterMeses(){
        return [
            {label: 'Selecione...', value:''},
            {label: 'JANEIRO', value:1},
            {label: 'FEVEREIRO', value:2},
            {label: 'MARÇO', value:3},
            {label: 'ABRIL', value:4},
            {label: 'MAIO', value:5},
            {label: 'JUNHO', value:6},
            {label: 'JULHO', value:7},
            {label: 'AGOSTO', value:8},
            {label: 'SETEMBRO', value:9},
            {label: 'OUTUBRO', value:10},
            {label: 'NOVEMBRO', value:11},
            {label: 'DEZEMBRO', value:12}
        ]
    }

    obterTipos(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'DESPESA', value: 'DESPESA'},
            {label: 'RECEITA', value: 'RECEITA'}
        ]
    }

    validar(lancamento){
        const erros = [] 

        if(!lancamento.ano){
            erros.push("Informe o ano!")
        }
        if(!lancamento.mes){
            erros.push("Informe o mês!")
        }
        if(!lancamento.descricao){
            erros.push("Informe a descrição!")
        }
        if(!lancamento.valor){
            erros.push("Informe o valor!")
        }
        if(!lancamento.tipo){
            erros.push("Informe o tipo!")
        }

        if(erros && erros.length >0 ){
            throw new ErroValidacao(erros)
        }
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status })
    }

    consult(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }
        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }
        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(`${params}&usuario=${lancamentoFiltro.usuario}`)
    }

    salvar(lancamento){
        return this.post('/', lancamento)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento)
    }
}