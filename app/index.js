import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../src/styles';
import { auth } from '../src/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';




export default function App() {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');
  const router = useRouter();

  function replacePass() {
    router.replace('/replacePass');
  }

  function newClient() {
    router.replace('/newClient');
  }

  function userLogin() {
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/home');
      })
      .catch((error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      }))
  }

  return (
    <ImageBackground
      source={require('../assets/img/agro2.jpg')}
      style={styles.backgroundImage}>

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image source={require('../assets/img/sislogo.png')} style={styles.logo} />
        </View>

        

        
        <TextInput style={styles.formInput}
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          autoComplete='email'
          value={userMail}
          onChangeText={setUserMail}
          placeholderTextColor='#4a9348'
        />
        <TextInput style={styles.formInput}
          placeholder='Senha'
          autoCapitalize='none'
          secureTextEntry
          value={userPass}
          onChangeText={setUserPass}
          placeholderTextColor='#4a9348'
        />
        <Pressable style={styles.formButton}
          onPress={userLogin}
        >
          <Text style={styles.textButton}>Entrar</Text>
        </Pressable>

        <View style={styles.separator} />

        <View style={styles.subContainer}>
          <Pressable style={styles.subButton}
            onPress={replacePass}
          >
            <Text style={styles.subTextButton}>Esqueceu a senha?</Text>
          </Pressable>
          
          <Pressable style={styles.subButton}
            onPress={newClient}
          >
            <Text style={styles.subTextButton}>Criar nova conta</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}