import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const Exchange = (props: any) => {
    const { navigation } = props;
    const cameraRef = useRef<RNCamera | null>(null);

    useEffect(() => {
        // Check if the screen is focused
        const unsubscribe = navigation.addListener('focus', () => {

        });

        return unsubscribe;
    }, [navigation]);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await cameraRef.current.takePictureAsync(options);
                console.log('Photo data:', data);
                // Handle the captured image data here, e.g., save it, display it, or send it to a server.
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={(ref) => {
                    cameraRef.current = ref;
                }}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={takePicture}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            backgroundColor: '#fff',
                            marginBottom: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </RNCamera>
        </View>
    );
};

export default Exchange;
