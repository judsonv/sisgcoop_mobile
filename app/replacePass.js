import { ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../src/styles";
import { useState } from "react"
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../src/firebase.config";

export default function ReplacePass() {
    const [userMail, setUserMail] = useState('');
    const router = useRouter();

    function replacePass() {
        if (userMail !== '') {
            sendPasswordResetEmail(auth, userMail)
                .then(() => {
                    alert("Prezado(a) usuário(a), sua solicitação de recuperação de senha foi concluída com êxito! Por favor, verifique seu e-mail imediatamente para redefinir sua senha e retomar o acesso à sua conta.");
                    router.replace("/");
                })
        } else {
            alert("Necessário preencher um e-mail válido para redefinir a sua senha.");
            return;
        }
    }

    return (
        <ImageBackground
            source={require('../assets/img/agro2.jpg')}
            style={styles.backgroundImage}>

            <View style={styles.container}>
                <Text style={styles.formTitle}>Recuperação</Text>

                <View style={styles.separator} />

                <TextInput
                    style={styles.formInput}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={userMail}
                    onChangeText={setUserMail}
                    placeholderTextColor='#4a9348'
                />
                <Pressable
                    style={styles.formButton}
                    onPress={replacePass}
                >
                    <Text style={styles.textButton}>Recuperar</Text>
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