import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const RegistrationScreen: React.FC = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const { navigation } = props;

    const createUser = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('user', userCredential.user);
                navigation.navigate('Register')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const validateForm = () => {
        var formValues = [fullName, email, password, confirmPassword];
        let passwordMatch = false;
        if (password != '') {
            passwordMatch = password === confirmPassword;
        }


        if (passwordMatch && !formValues.includes('')) {
            createUser();
        }
        else {
            console.log("Error: FormValues", formValues, 'PasswordMatch', passwordMatch);
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <Text style={styles.text}>Book Exchange</Text>
            </View>
            <ScrollView style={styles.bottomView}>
                <Text style={styles.heading}>
                    Create Account
                </Text>
                <View style={styles.formView}>
                    <TextInput
                        value={fullName}
                        onChangeText={(value) => setFullName(value)}
                        style={styles.textInput}
                        placeholder='Enter full name'
                        placeholderTextColor={"#fff"}
                    />
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
                    <TextInput
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        style={styles.textInput}
                        placeholder='Confirm password'
                        placeholderTextColor={"#fff"}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={validateForm}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        height: '15%',
        alignItems: 'center'
    },
    bottomView: {
        width: '100%',
        height: '85%',
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


export default RegistrationScreen;
