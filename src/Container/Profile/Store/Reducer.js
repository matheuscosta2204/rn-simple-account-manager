import * as actionTypes from './Actions';

const initalState = {
    cpf: "",
    password: "",
};

const reducer = (state = initalState, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
};

export default reducer;
