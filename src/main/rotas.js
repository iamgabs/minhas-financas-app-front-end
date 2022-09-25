import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import CadastroUsuario from "../views/cadastroUsuario"
import Login from "../views/login"
import Home from "../views/home"
import ConsultaLancamento from "../views/lançamentos/consultaLancamento"
import cadastroLancamento from "../views/lançamentos/cadastroLancamento"
import AuthService from "../app/service/authService"

function AuthRoute({ component: Component, ...props }){
    return (
        <Route {...props} render={ (componentProps) => {
            if(AuthService.isAuthUser()){
                return (
                    <Component {...componentProps}/>
                )
            }else{
                return (
                    <Redirect to={{pathname: '/login', state: {from: componentProps.location}}} />
                ) 
            }
        }}/>
    )
}

function Rotas(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuarios" component={CadastroUsuario} />

                <AuthRoute exact path="/home" component={Home} />
                <AuthRoute exact path="/consulta-lancamentos" component={ConsultaLancamento} />
                <AuthRoute exact path="/cadastro-lancamentos/:id?" component={cadastroLancamento} />
            </Switch>
        </BrowserRouter>
    )
}

export default Rotas