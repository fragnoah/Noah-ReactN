import * as _ from "lodash";
import * as React from "react";
import {Image, Animated, StyleSheet, View, Platform} from "react-native";
import {BlurView, FileSystem} from "expo";
import SHA1 from "crypto-js/sha1";
import type { StyleObj as Style } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type SmartImageProps = BaseProps & {
    style?: Style,
    preview?: string,
    uri: string
};

type SmartImageState = {
    uri: string,
    intensity: Animated.Value
};

const propsToCopy = [
    "borderRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"
];

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
export default class SmartImage extends React.Component<SmartImageProps, SmartImageState> {

    async componentWillMount(): Promise<void> {
        const {preview, uri} = this.props;
        this.setState({ intensity: new Animated.Value(100) });
        const entry = await getCacheEntry(uri);
        if (!entry.exists) {
            if (preview) {
                this.setState({ uri: preview });
            }
            if (uri.startsWith("file://")) {
                await FileSystem.copyAsync({ from: uri, to: entry.path });
            } else {
                await FileSystem.downloadAsync(uri, entry.path);
            }
        }
        this.setState({ uri: entry.path });
    }

    onLoadEnd(uri: string) {
        if (!uri.startsWith("data:")) {
            const intensity = new Animated.Value(100);
            this.setState({ intensity });
            Animated.timing(intensity, { duration: 300, toValue: 0, useNativeDriver: Platform.OS === "ios" }).start();
        }
    }

    render(): React.Node {
        const {style} = this.props;
        const {uri, intensity} = this.state;
        const computedStyle = [
            StyleSheet.absoluteFill,
            _.pickBy(StyleSheet.flatten(style), (value, key) => propsToCopy.indexOf(key) !== -1)
        ];
        return (
            <View {...{style}}>
                {
                    uri && (
                        <Image
                            source={{ uri }}
                            resizeMode="cover"
                            style={computedStyle}
                            onLoadEnd={() => this.onLoadEnd(uri)}
                        />
                    )
                }
                {
                    Platform.OS === "ios" && <AnimatedBlurView tint="default" style={computedStyle} {...{intensity}} />
                }
            </View>
        );
    }
}

const getCacheEntry = async(uri): Promise<{ exists: boolean, path: string }> => {
    const ext = uri.substring(uri.lastIndexOf("."), uri.indexOf("?") === -1 ? undefined : uri.indexOf("?"));
    const path = FileSystem.cacheDirectory + SHA1(uri) + ext;
    const info = await FileSystem.getInfoAsync(path);
    const {exists} = info;
    return { exists, path };
}