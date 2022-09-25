import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {
    static isAuthUser(){
        const usuario = LocalStorageService.getItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static logoutApp(){
        LocalStorageService.deleteItem(USUARIO_LOGADO)
    }
}