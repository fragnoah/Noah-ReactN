import { Alert } from 'react-native';

/*

*/

export const startInfo = () => {
    Alert.alert(
        'Information',
        'Hier kann der StartText eingefügt werden',
        [
        { text: 'Abbrechen', onPress: () => false, style: 'cancel' },
        { text: 'OK', onPress: () => true },
        ],
        { cancelable: true }
    );
};

export const resultInfo = () => {
    Alert.alert(
        'Information',
        'Hier kann der ResultText eingefügt werden',
        [
        { text: 'Abbrechen', onPress: () => false, style: 'cancel' },
        { text: 'OK', onPress: () => true },
        ],
        { cancelable: true }
    );
};
