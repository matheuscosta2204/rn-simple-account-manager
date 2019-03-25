import * as actionTypes from './Actions';

const initalState = {
    idUser: "",
    name: "",
    cpf: "",
    password: "",
    picture: require('../../../Assets/Images/inv-user.png'),
};

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.NAME_CHANGED:
            return {
                ...state,
                name: action.name
            }
        case actionTypes.CPF_CHANGED:
            return {
                ...state,
                cpf: action.cpf
            }
        case actionTypes.PASSWORD_CHANGED:
            return {
                ...state,
                password: action.password
            }
        case actionTypes.PICTURE_CHANGED:
            return {
                ...state,
                picture: action.picture
            }
        case actionTypes.SET_USER:
            return {
                ...state,
                idUser: action.user.idUsuario,
                name: action.user.nome,
                password: action.user.senha,
                cpf: action.user.cpf,
                picture: { uri: action.user.foto },
            }
        default:
            return state;
    }
};

export default reducer;
