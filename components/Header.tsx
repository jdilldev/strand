import { View, Image, StyleSheet } from 'react-native';

export const Header = () => {
    return <Image
        style={{ display: 'flex', alignSelf: 'center', width: 150, height: 75 }}
        source={require('../assets/images/logo.png')}
    />
}
