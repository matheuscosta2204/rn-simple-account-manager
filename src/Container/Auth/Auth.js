import React from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
//import { connect } from 'react-redux';

//import * as actionTypes from './store/actions';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    this.props.navigation.navigate('Login');
    // const isLogged = await AsyncStorage.getItem('alunoLogado');

    // // This will switch to the App screen or Auth screen and this loading
    // // screen will be unmounted and thrown away.
    // if(isLogged === '1') {
    //   const idAluno = await AsyncStorage.getItem('idAluno');
    //   const tokenAluno = await AsyncStorage.getItem('tokenAluno');
    //   this.props.onIdAlunoChanged(idAluno);
    //   this.props.onTokenAlunoChanged(tokenAluno);
    //   // setTimeout(() => {
    //     this.props.navigation.navigate('AreaAluno');
    //     // }, 2000);
    // } else {
    //   this.props.navigation.navigate('Login');
    // }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//       onIdAlunoChanged: (idAluno) => dispatch({ type: actionTypes.ID_ALUNO_CHANGED, idAluno: idAluno }),
//       onTokenAlunoChanged: (tokenAluno) => dispatch({ type: actionTypes.TOKEN_ALUNO_CHANGED, tokenAluno: tokenAluno }),
//   }
// }

export default AuthScreen;
//export default connect(null, mapDispatchToProps)(AlunoAuthScreen);
