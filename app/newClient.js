import { useState } from 'react';
import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../src/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebase.config';
import { router } from 'expo-router';

export default function NewUser() {
    const [userName, setUserName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userRePass, setUserRePass] = useState('');

    function newUser() {
        if (userName === '' || userMail === '' || userPass === '' || userRePass === '') {
            alert('Necessário preencher todos os campos!');
            return;
        }
    
        if (userPass !== userRePass) {
            alert('As senhas digitadas não são iguais!');
            return;
        }
    
        createUserWithEmailAndPassword(auth, userMail, userPass)
            .then((userCredential) => {
                const user = userCredential.user;
    
                const userCollection = collection(db, 'users');
                const userData = {
                    userName,
                    userMail,
                };
    
                return addDoc(userCollection, userData);
            })
            .then(() => {
                alert('O Cliente ' + userName + ' foi criado com sucesso!');
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
    
    
    return (
        <ImageBackground
            source={require('../assets/img/agro2.jpg')}
            style={styles.backgroundImage}>

            <View style={styles.container}>

                <Text style={styles.formTitle}>Cadastro</Text>

                <View style={styles.separator} />

                <TextInput
                    style={styles.formInput}
                    placeholder='Nome Completo'
                    autoCapitalize='words'
                    value={userName}
                    onChangeText={setUserName}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.formInput}
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoComplete='email'
                    value={userMail}
                    onChangeText={setUserMail}
                    placeholderTextColor='#4a9348'
                />
                <TextInput
                    style={styles.formInput}
                    placeholder='Senha'
                    autoCapitalize='none'
                    secureTextEntry
                    value={userPass}
                    onChangeText={setUserPass}
                    placeholderTextColor='#4a9348'
                />
                <TextInput
                    style={styles.formInput}
                    placeholder='Confirmar Senha'
                    autoCapitalize='none'
                    secureTextEntry
                    value={userRePass}
                    onChangeText={setUserRePass}
                    placeholderTextColor='#4a9348'
                />
                <Pressable
                    style={styles.formButton}
                    onPress={newUser}
                >
                    <Text style={styles.textButton}>
                        Cadastrar
                    </Text>
                </Pressable>

                <View style={styles.separator} />

                <View style={styles.subContainer}>
                    <Pressable style={styles.subButton}
                        onPress={() => router.push("/")}
                    >
                        <Text style={styles.subTextButton}>Voltar</Text>
                    </Pressable>
                </View>
            </View>

        </ImageBackground>
    );
}