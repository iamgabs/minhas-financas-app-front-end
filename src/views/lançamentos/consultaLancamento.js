import React from "react"
import { withRouter } from "react-router-dom"
import LancamentoService from "../../app/service/lancamentoService"
import LocalStorageService from "../../app/service/localStorageService"
import Card from "../../components/cards"
import FormGroup from "../../components/formgroup"
import SelectMenu from "../../components/selectMenu"
import { alertMessage, errorMessage, successMessage } from "../../components/toastr"
import LancamentosTable from "./lancamentosTable"
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'


class ConsultaLancamento extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    buscar = () => {
        if(!this.state.ano){
            alertMessage("O campo 'ano' é obrigatório!")
            return false 
        }

        const usuarioLogado = LocalStorageService.getItem("_usuario_logado")

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id
        }

        this.service.consult(lancamentoFiltro)
            .then(response => {
                const lista = response.data
                if(lista.length < 1){
                    alertMessage("Nenhum resultado encontrado!")
                }
                this.setState({ lancamentos: lista })
            }).catch(error => {
                errorMessage('Não foi possível encrontrar')
            })
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
        .then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)
            if(index !== -1){
                lancamento['status'] = status
                lancamentos[index] = lancamento
                this.setState(lancamentos)
            }
            successMessage("Status atualizado com sucesso!")
        })
        .catch(error => {
            errorMessage(error.reponse.data)
        })
    }

    preparaCadastrar = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
        .then(reponse => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index, 1)
            this.setState({lancamentos: lancamentos, showConfirmDialog: false})
            successMessage('Lançamento deletado com sucesso!')
        })
        .catch(erro => {
            errorMessage(erro)
        })
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    render(){
        const listMonth = this.service.obterMeses()
        const listType = this.service.obterTipos()

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar}/>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        )

        return (
            <Card title="Consultar Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component" style={{padding: ".2rem", margin: ".3rem"}}>
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputAno"
                                    placeholder="Digite o Ano: " 
                                    value={this.state.ano}
                                    onChange={e => this.setState({ano: e.target.value})}
                                    style={{marginBottom: ".5rem"}}/>
                            </FormGroup>
                            <FormGroup label="Mês: " htmlFor="inputMes" >
                                <SelectMenu 
                                    id="inputMes" 
                                    className="form-control" 
                                    list={listMonth} 
                                    value={this.state.mes}
                                    onChange={e => this.setState({mes: e.target.value})}
                                    style={{marginBottom: ".5rem"}} />
                            </FormGroup>

                            <FormGroup label="Descrição: " htmlFor="inputDesc">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputDesc"
                                    placeholder="Informe a descricão: " 
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ano: e.target.value})}
                                    style={{marginBottom: ".5rem"}}/>
                            </FormGroup>

                            <FormGroup label="Tipo de lançamento: " htmlFor="inputTipo"> 
                                <SelectMenu 
                                    id="inputTipo" 
                                    className="form-control" 
                                    list={listType} 
                                    value={this.state.tipo}
                                    onChange={e => this.setState({tipo: e.target.value})}
                                    style={{marginBottom: ".5rem"}} />
                            </FormGroup>
                            <br/>
                            <button type="button" onClick={this.buscar} className="btn btn-success">
                                <i className="pi pi-search"/> Buscar
                            </button>
                            <button type="button" onClick={this.preparaCadastrar} className="btn btn-danger">
                                <i className="pi pi-plus"/> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable 
                                lancamentos={this.state.lancamentos} 
                                editAction={this.editar}  
                                deleteAction={this.abrirConfirmacao}
                                alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog 
                        header="Confirmação"
                        visible={this.state.showConfirmDialog}
                        style={{width: '50vw'}}
                        modal={true}
                        footer={footer}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                            Confirma a exclusão deste lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

 
export default withRouter(ConsultaLancamento)