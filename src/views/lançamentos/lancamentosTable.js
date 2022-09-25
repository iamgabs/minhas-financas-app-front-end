import React from "react"
import currencyFormater from "currency-formatter"

export default props => {

    const rows =  props.lancamentos.map( lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{ currencyFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                            type="button" className="btn btn-success" 
                            disabled={lancamento.status!=='PENDENTE'}
                            title="Efetivar">
                                <i className="pi pi-check"></i>
                    </button>
                    <button onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                            type="button" className="btn btn-warning"
                            disabled={lancamento.status!=='PENDENTE'}
                            title="Cancelar">
                                <i className="pi pi-times"></i>
                    </button>
                    <button type="button" className="btn btn-primary" 
                        onClick={e => props.editAction(lancamento.id)} title="Editar">
                                <i className="pi pi-pencil"></i>
                        </button>
                    <button type="button" className="btn btn-danger" 
                        onClick={e => props.deleteAction(lancamento)} title="Deletar">
                                <i className="pi pi-trash"></i>
                        </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}