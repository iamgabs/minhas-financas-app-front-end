import React from "react"
import Card from "../components/cards"
import FormGroup from "../components/formgroup"
import { withRouter } from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService"
import { successMessage, errorMessage } from '../components/toastr'
import { AuthContext } from "../main/authProvider"

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            this.context.startSession(response.data)
            successMessage('Logado com sucesso!')
            this.props.history.push("/home")
        }).catch( erro => {
            errorMessage(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return <div className="row">
                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <span>{this.state.mensagemErro}</span>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="container">
                                    <FormGroup label="Email: *" htmlFor="exampleInputEmail1" >
                                        <input 
                                            type="email" 
                                            value={this.state.email}
                                            onChange={e => this.setState({email: e.target.value})}
                                            className="form-control" 
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Digite o Email" />
                                    </FormGroup>
                                    <br/>
                                    <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                        <input 
                                            type="password" 
                                            value={this.state.senha}
                                            onChange={e => this.setState({senha: e.target.value})}
                                            className="form-control" 
                                            id="exampleInputPassword1" 
                                            placeholder="Password" />
                                    </FormGroup>
                                    <br/>
                                    <button onClick={this.entrar} className="btn btn-success">
                                        <i className="pi pi-sign-in"/> Entrar
                                    </button>
                                    <button onClick={this.prepareCadastrar} className="btn btn-danger">
                                        <i className="pi pi-plus"/> Cadastrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    }
}

Login.contextType = AuthContext

export default withRouter(Login)
