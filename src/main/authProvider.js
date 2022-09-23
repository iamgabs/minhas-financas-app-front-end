import React from "react"
import AuthService from "../app/service/authService"

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider

class ProvedorAutenticacao extends React.Component {

    state = {
        authUser: {},
        isAuth: false
    }

    startSession = (usuario) => {  
        this.setState({isAuth: true, authUser: usuario});
        AuthService.login(usuario);
    }

    endSession = () => {
        AuthService.logoutApp();
        this.setState({isAuth: false, authUser: {}});
    }

    render(){

        const context = {
            authUser: this.state.authUser,
            isAuth: this.state.isAuth,
            startSession: this.startSession,
            endSession: this.endSession
        }
    
        return (
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao