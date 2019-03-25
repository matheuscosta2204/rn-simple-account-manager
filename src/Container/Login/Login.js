import React from 'react';
import { View, Text,TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';

import Logo from '../../Assets/Images/logo.png';
import * as actionTypes from '../Profile/Store/Actions';

class LoginScreen extends React.Component {

    changeCPF = (text) => {
        this.props.onCPFChange(text);
    }

    changePass = (text) => {
        this.props.onPasswordChange(text);
    }

    signIn = () => {        
        if(this.props.profile.cpf.length !== 0) {
            this.authenticate();
        } else {
            alert('Por gentileza, digite algum CPF.');
        }
    }

    authenticate = async () => {
        let response = await fetch(`https://prontoachei.com.br/api/usuarios/Login.php?cpf=${this.props.profile.cpf}&senha=${this.props.profile.password}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .catch((error) => {
                console.error(error);
            })

        if (response.status === 200) {
            let responseJson = await response.json();
            if(responseJson.result) {
                let data = JSON.parse(responseJson.data)[0];
                this.props.onSetUser(data);
                this.props.navigation.navigate('Profile');
            } else {
                alert(responseJson.msg);
            }
        }
    }

    goTo = () => {
        this.props.onSetUser({
            idUser: "",
            name: "",
            cpf: "",
            password: "",
            picture: require('../../Assets/Images/inv-user.png'),
        });
        this.props.navigation.navigate('NewUser');
    }
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#393E46' }}>
                <Image source={Logo} style={{ width: 300, height: 300 }}/>
                <TextInput 
                    placeholder="CPF"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={this.props.profile.cpf}
                    onChangeText={(text) => this.changeCPF(text) }
                    keyboardType={'numeric'}
                    style={{ height: 40, backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '80%', borderRadius: 5, marginVertical: 10, color: 'white', }}/>

                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={this.props.profile.password}
                    onChangeText={(text) => this.changePass(text) }
                    secureTextEntry={true}
                    style={{ height: 40, backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '80%', borderRadius: 5, marginVertical: 10, color: 'white', }}/>

                <TouchableOpacity onPress={ this.signIn }
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#01ACB5',
                        padding: 10,
                        marginVertical: 10,
                        width: '80%',
                        borderRadius: 5,
                    }}>
                    <Text
                        style={{ color: 'white' }}>
                        Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ this.goTo }
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#01ACB5',
                        padding: 10,
                        marginVertical: 10,
                        width: '80%',
                        borderRadius: 5,
                    }}>
                    <Text
                        style={{ color: 'white' }}>
                        Create Account</Text>
                </TouchableOpacity>
            </View>            
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCPFChange: (cpf) => dispatch({ type: actionTypes.CPF_CHANGED, cpf }),
        onPasswordChange: (password) => dispatch({ type: actionTypes.PASSWORD_CHANGED, password }),
        onSetUser:  (user) => dispatch({ type: actionTypes.SET_USER, user }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);