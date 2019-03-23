import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class NewUserScreen extends React.Component {

    onClickToPic = () => {
        console.log('ola');

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
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = { uri: response.uri };
                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
                console.log('Source: ', source);
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#393E46' }}>
                <TouchableOpacity onPress={ this.onClickToPic }>
                    <Text style={{ color: 'white' }}>Click to take a pic</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default NewUserScreen;