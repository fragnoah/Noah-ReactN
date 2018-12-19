import React from 'react';
import { Image } from 'react-native';

const DynImage = (props) => {
    console.log('DynImageProps: ', props);
    return (
        <Image 
            style={{ height: props.imageHeight, width: props.imageWidth }} 
            source={props.imageName} 
        />
    );
};

export { DynImage };
