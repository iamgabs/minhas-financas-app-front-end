import React from "react";
import Card from "../components/cards";
import FormGroup from "../components/formgroup";
import { withRouter } from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import { alertMessage, errorMessage, successMessage } from "../components/toastr";

class CadastroUsuario extends React.Component{
   
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }


    constructor(){  
        super()
        this.service = new UsuarioService()
    }

    cadastrar = () => {  
        const { nome, email, senha, senhaRepeticao } = this.state
        const usuario = { nome, email, senha, senhaRepeticao }

        try{
            this.service.validar(usuario)
        }catch(erro){
            const msgs = erro.mensagens
            msgs.forEach(msg => alertMessage(msg))
            return false
        }

        this.service.save(usuario)
        .then(response => {
            successMessage('Usuário cadastrado com sucesso!')
            this.props.history.push('/login')
        }).catch(erro => {
            errorMessage(erro.response.data)
        })
    }

    prepareLogar = () => {
        this.props.history.push('/login')
    }
 
    render(){
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNome" label="Nome: *">
                                <input 
                                    type="text" 
                                    id="inputNome"
                                    className="form-control" 
                                    name="nome"
                                    onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>
                            <FormGroup htmlFor="inputEmail" label="Email: *">
                                <input 
                                    type="email"
                                    id="inputEmail"
                                    className="form-control" 
                                    name="email"
                                    onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup htmlFor="inputSenha" label="Senha: *">
                                <input 
                                    type="password" 
                                    id="inputSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({senha: e.target.value})}/>
                            </FormGroup>
                            <FormGroup htmlFor="inputRepitaSenha" label="Repita  a senha: *">
                                <input 
                                    type="password" 
                                    id="inputRepitaSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                            </FormGroup>
                            <button onClick={this.cadastrar} className="btn btn-success">
                                <i className="pi pi-save"/> Salvar
                            </button>
                            <button onClick={this.prepareLogar} className="btn btn-danger">
                                <i className="pi pi-times"/> Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)
