import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const avatar = (props) => (
    <TouchableOpacity onPress={ props.takePic } style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginVertical: 20 }}>
        <View style={{ backgroundColor: 'white', width: 170, height: 170, borderRadius: 85, borderWidth: 3, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={props.source} style={{ width: 167, height: 167, borderRadius: 84 }} />
        </View>
        <View>
            <Icon name='camera' size={30} color='white' />
        </View>
    </TouchableOpacity>
);

export default avatar;