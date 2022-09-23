import ApiService from '../apiservice'
import ErroValidacao from '../exception/erroValidacao'

class UsuarioService extends ApiService {
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    getSaldo(id){
        return this.get(`/${id}/saldo`)
    }

    save(usuario){
        return this.post('', usuario)
    }

    validar(usuario){
        const msg = []  

        if(!usuario.nome){
            msg.push('O campo Nome é obrigatório!')
        }
        if(!usuario.email){
            msg.push('O campo Email é obrigatório!')
        } else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9/]+\.[a-z]/)){
            msg.push('Informe um email válido!')
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            msg.push('Informe a senha!')
        } else if(usuario.senha !== usuario.senhaRepeticao){
            msg.push("As senhas informadas não são iguais!")
        }

        if(msg && msg.length>0){
            throw new ErroValidacao(msg)
        }
    }
}

export default UsuarioService
