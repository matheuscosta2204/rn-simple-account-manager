import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import Avatar from '../../Components/Avatar/Avatar';
import * as actionTypes from '../Profile/Store/Actions';

class NewUserScreen extends React.Component {
    onClickToPic = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'rnSimpliAccountManagerImages',
            },
        };
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.props.onPictureChange(source);
            }
        });
    }

    changeName = (text) => {
        this.props.onNameChange(text);
    }

    changeCPF = (text) => {
        this.props.onCPFChange(text);
    }

    changePass = (text) => {
        this.props.onPasswordChange(text);
    }

    saveUser = async () => {
        let body = {
            nome: this.props.profile.name,
            senha: this.props.profile.password,
            cpf: this.props.profile.cpf,
            foto: this.props.profile.picture.uri
        }
        console.log(body);

        let response = await fetch(`https://prontoachei.com.br/api/usuarios/InserirUsuario.php`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .catch((error) => {
                console.error(error);
            })

        console.log(response);
        if (response.status === 200) {
            let responseJson = await response.json();
            console.log(responseJson);
            if(responseJson.result) {
                this.props.navigation.navigate('Login');
            } else {
                alert(responseJson.msg);
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#393E46' }}>
                <Avatar 
                    source={ this.props.profile.picture } 
                    takePic={ this.onClickToPic } />

                <TextInput 
                    placeholder="Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={this.props.profile.name}
                    onChangeText={(text) => this.changeName(text) }
                    style={{ height: 40, backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '80%', borderRadius: 5, marginVertical: 10, color: 'white', }}/>

                <TextInput 
                    placeholder="CPF"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={this.props.profile.cpf}
                    onChangeText={(text) => this.changeCPF(text) }
                    style={{ height: 40, backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '80%', borderRadius: 5, marginVertical: 10, color: 'white', }}/>

                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={this.props.profile.password}
                    onChangeText={(text) => this.changePass(text) }
                    style={{ height: 40, backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '80%', borderRadius: 5, marginVertical: 10, color: 'white', }}/>

                <TouchableOpacity onPress={ this.saveUser }
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
                        Save</Text>
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
        onNameChange: (name) => dispatch({ type: actionTypes.NAME_CHANGED, name }),
        onCPFChange: (cpf) => dispatch({ type: actionTypes.CPF_CHANGED, cpf }),
        onPasswordChange: (password) => dispatch({ type: actionTypes.PASSWORD_CHANGED, password }),
        onPictureChange: (picture) => dispatch({ type: actionTypes.PICTURE_CHANGED, picture }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserScreen);