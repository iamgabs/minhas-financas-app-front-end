import React from "react"
import LocalStorageService from "../app/service/localStorageService"
import UsuarioService from "../app/service/usuarioService"
import { AuthContext } from "../main/authProvider"

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount(){
        let usuarioLogado = LocalStorageService.getItem("_usuario_logado")

        this.usuarioService.getSaldo(usuarioLogado.id).then(response => {
            this.setState({saldo: response.data})
        }).catch(error => {
            console.log(error.data)
        })
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                        <div className="card bg-light mb-3"  style={{padding: '2rem'}}>
                            <h1 className="display-3">Bem vindo!</h1>
                            <p className="lead">Esse é seu sistema de finanças.</p>
                            <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                            <hr className="my-4"/>
                            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                            <p className="lead">
                            <a className="btn btn-primary btn-lg" href="/cadastro-usuarios" role="button"><i className="pi pi-users"></i>  Cadastrar Usuário</a>
                            <a className="btn btn-danger btn-lg" href="/cadastro-lancamentos" role="button"><i className="pi pi-money-bill"></i>  Cadastrar Lançamento</a>
                            </p>
                        </div>
                </div>
            </div>
            
        )
    }
}

Home.contextType = AuthContext;

export default Home
