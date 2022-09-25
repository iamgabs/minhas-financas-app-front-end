import React from "react"
import { withRouter } from 'react-router-dom'
import Card from "../../components/cards"
import FormGroup from "../../components/formgroup"
import SelectMenu from "../../components/selectMenu"
import LancamentoService from "../../app/service/lancamentoService"
import LocalStorageService from "../../app/service/localStorageService"
import { errorMessage, alertMessage, successMessage } from "../../components/toastr"

class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    submit = () => {
        const { descricao, valor, mes, ano, tipo } = this.state
        const usuarioLogado = LocalStorageService.getItem('_usuario_logado')

        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens =  erro.mensagens
            mensagens.forEach(msg => {
                alertMessage(msg)
            })
            return false
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                successMessage("Lançamento cadastrado com sucesso!")
            })
            .catch(error => {
                errorMessage(error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, id, status, usuario } = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, status, id, usuario }

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                successMessage("Lanamento atualizado com sucesso!")
            })
            .catch(error => {
                errorMessage(error.response.data)
            })
    }

    componentDidMount(){
        const params = this.props.match.params

        if(params.id){
            this.service.obterPorId(params.id)
            .then(response => {
                this.setState({...response.data, atualizando: true})
            })
            .catch(error => {
                errorMessage(error.response.data)
            })
        }
    }

    handleChange = (event) => {
        const value = event.target.value 
        const name = event.target.name

        this.setState({ [name]: value })
    }

    render(){
        const tipos = this.service.obterTipos()
        const meses = this.service.obterMeses()

        return (    
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input type="text"
                                id="inputDescricao"
                                className="form-control" 
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                id="inputAno"
                                className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu 
                                id="inputMes" 
                                list={meses}
                                className="form-control" 
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input type="text"
                                id="inputValor" 
                                className="form-control" 
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu 
                                id="inputTipo" 
                                list={tipos}
                                className="form-control" 
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: *">
                            <input 
                                id="inputStatus"
                                type="text" 
                                className="form-control" 
                                name="status"
                                value={this.state.status}
                                onChange={this.handleChange} disabled/>
                        </FormGroup>
                    </div>

                    <div style={{marginTop: "1rem"}}>
                        { this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} className="btn btn-primary">
                                    <i className="pi pi-refresh"/> Atualizar
                                </button>
                            ) :
                            (
                                <button onClick={this.submit} className="btn btn-success">
                                    <i className="pi pi-save"/> Salvar
                                </button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">
                            <i className="pi pi-times"/> Cancelar
                        </button>
                    </div>
                    

                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento)