import React from "react"
import NavBarItem from "./navbarItem"
import AuthService from "../app/service/authService"

const logout = () => {
  AuthService.logoutApp()
}

const isAuthUser = () => {
  return AuthService.isAuthUser()
}


function Navbar(){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="/" className="navbar-brand">Minhas Finanças</a>
          <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarResponsive" 
                aria-controls="navbarResponsive" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavBarItem render={isAuthUser()} href="/home" label="Home"/>
                <NavBarItem render={isAuthUser()} href="/cadastro-usuarios" label="Usuários"/>
                <NavBarItem render={isAuthUser()} href="/consulta-lancamentos" label="Lançamentos"/>
                <NavBarItem render={isAuthUser()} href="/login" label="Sair" onClick={logout} />
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Navbar 
