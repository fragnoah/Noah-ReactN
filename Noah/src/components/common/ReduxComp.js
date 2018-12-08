import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducers';

const ReduxComp = () => {
    return (
        <Provider store={createStore(reducers)}>
            <View>
                <Text>
                    Test 123
                </Text>
            </View>
        </Provider>
    );
};

export default ReduxComp;

