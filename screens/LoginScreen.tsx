import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const LoginScreen: React.FC = (props: any) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { navigation } = props;

    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                setIsSignedIn(true);
            }
            else {
                setIsSignedIn(false);
            }
        });
    }, []);

    const handleLogin = () => {
        try {
            signInWithEmailAndPassword(auth, email, password).then((result: any) => { console.log(result) });
        }
        catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    const validateInput = () => {
        var formValues = [email, password];
        if (formValues.includes('')) {
            console.log("Error", email, password);
        }
        else {
            handleLogin();
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <Text style={styles.text}>Book Exchange</Text>
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.heading}>
                    Welcome{'\n'}
                    Back
                </Text>
                <View style={styles.formView}>
                    <TextInput
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        style={styles.textInput}
                        placeholder='Enter email'
                        placeholderTextColor={"#fff"}
                    />
                    <TextInput
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        style={styles.textInput}
                        placeholder='Enter password'
                        placeholderTextColor={"#fff"}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={validateInput}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
                        No account? Register
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        marginTop: 40,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        width: '100%',
        height: '40%',
        alignItems: 'center'
    },
    bottomView: {
        width: '100%',
        height: '75%',
        backgroundColor: '#000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    text: {
        fontSize: 20,
        alignItems: 'center',
        marginTop: 40
    },
    heading: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 40,
        marginLeft: 30
    },
    formView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20
    },
    textInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        height: 52,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
        color: '#fff'
    },
    button: {
        width: '50%',
        color: '#fff',
        borderColor: '#fff',
        height: 52,
        backgroundColor: '#000',
        borderRadius: 10,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderWidth: 1,
        marginLeft: 80
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#fff'
    },
    registerText: {
        fontWeight: '300',
        fontSize: 18,
        color: 'gray',
        marginTop: 20,
        marginLeft: 85
    }
});

export default LoginScreen;
