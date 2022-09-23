import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {
    static isAuthUser(){
        const user = LocalStorageService.getItem(USUARIO_LOGADO)
        return user && user.id;
    }

    static logoutApp(){
        LocalStorageService.deleteItem(USUARIO_LOGADO)
    }

    static login(user){
        LocalStorageService.addItem(USUARIO_LOGADO, user)
    }

    static getAuthUser(){
        return LocalStorageService.getItem(USUARIO_LOGADO)
    }
}