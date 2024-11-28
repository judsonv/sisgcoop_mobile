import { useState } from 'react';
import { Image, Pressable, Text, View, TextInput } from "react-native";
import { styles } from "../src/styles"
import { auth, db } from "../src/firebase.config"
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
    const [clientPhoto, setClientPhoto] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientCpf, setClientCpf] = useState('');
    const [clientGenero, setClientGenero] = useState('');
    const [clientData, setClientData] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientTelefone, setClientTelefone] = useState('');
    const [clientLogradouro, setClientLogradouro] = useState('');
    const [clientNumero, setClientNumero] = useState('');
    const [clientComplemento, setClientComplemento] = useState('');
    const [clientBairro, setClientBairro] = useState('');
    const navigation = useNavigation();

    async function registerClient() {
        if (clientPhoto === '' || clientName === '' || clientCpf === '' || clientGenero === '' || clientData=== '' || clientEmail === ''
         || clientTelefone === '' || clientLogradouro === '' || clientNumero === '' || clientComplemento === '' || clientBairro === '' ) {
            alert('Necessário preencher todos os campos!');
            return;
        }

        const currentUser = auth.currentUser;

        if (currentUser) {
            const userId = currentUser.uid;

            const clientsCollection = collection(db, 'clients');
            const clientsData = {
                clientPhoto,
                clientName,
                clientCpf,
                clientGenero,
                clientData,
                clientEmail,
                clientTelefone,
                clientLogradouro,
                clientNumero,
                clientComplemento,
                clientBairro,
                idClient: userId, 
            };

           
            try {
                await addDoc(clientsCollection, clientsData);
                alert('Cliente ' + clientName + ' adicionado com sucesso!');
                router.replace('/manageClients');

            } catch (error) {
                console.error('Error adding client: ', error);
                alert('Erro ao adicionar o cliente. Tente novamente mais tarde.');
            }

        } else {
            alert('É necessário estar logado para utilizar este recurso!');
            router.replace('/');
        }
    }

    const currentUser = auth.currentUser;
    const router = useRouter();
   

    if (currentUser != null) {
        //Usuário Logado
    } else {
        alert('É necessário estar logado para utilizar este recurso!');
        router.replace('/');
    }

    function home() {
        router.replace('/home');
    }

    function manageClients() {
        router.replace('/manageClients');
    }

    function manageProducts() {
        router.replace('/manageProducts');
    }
    function profile() {
        router.replace('/profile');
    }

    function addClients() {
        router.replace('/addClients');
    }
    function clients() {
        router.replace('/clients');
    }


    function logout() {
        signOut(auth)
            .then(() => {
                alert('Você desconectou-se do sistema!');
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.errorMessage;
                alert(errorMessage);
            });
    }

    return (
        <View style={styles.internalContainer}>
            <View style={styles.topBar}>
                <View style={styles.iconsMenu}>
                    <Pressable onPress={home}>
                        <Ionicons style={styles.icons} name="home-outline" size={28} color={'#CCC'} />
                    </Pressable>

                    <Pressable onPress={manageProducts}>
                        <Ionicons style={styles.icons} name="cube-outline" size={28} color={'white'} />
                    </Pressable>


                    <Pressable
                        onPress={profile}
                    >
                        <Ionicons style={styles.icons} name="person-outline" size={28} color={'#CCC'} />
                    </Pressable>

                    <Pressable
                        onPress={manageClients} 
                    >
                        <Ionicons style={styles.icons} name="people-outline" size={32} color={'#CCC'} />
                    </Pressable>

                    <Pressable
                        onPress={logout}
                    >
                        <Ionicons style={styles.icons} name="log-out-outline" size={32} color={'#CCC'} />
                    </Pressable>
                </View>
                <View style={styles.menuLogo}>
                    <Image
                        source={require('../assets/img/sislogo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <Text style={styles.bodyTitle}>Cadastro de Clientes</Text>

            <View style={styles.dataContainer}>
                <TextInput
                    style={styles.inputData}
                    placeholder='Link da Foto do cliente'
                    autoCapitalize='words'
                    onChangeText={setClientPhoto}
                    value={clientPhoto}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.inputData}
                    placeholder='Nome do Cliente'
                    autoCapitalize='words'
                    value={clientName}
                    onChangeText={setClientName}
                    placeholderTextColor='#4a9348'
                />
              
                <TextInput
                    style={styles.inputData}
                    placeholder='Cpf'
                    autoCapitalize='words'
                    value={clientCpf}
                    onChangeText={setClientCpf}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.inputData}
                    placeholder='Genêro'
                    autoCapitalize='words'
                    value={clientGenero}
                    onChangeText={setClientGenero}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.inputData}
                    placeholder='Data de nascimento'
                    autoCapitalize='words'
                    value={clientData}
                    onChangeText={setClientData}
                    placeholderTextColor='#4a9348'
                />

            <TextInput
                    style={styles.inputData}
                    placeholder='Email'
                    autoCapitalize='words'
                    value={clientEmail}
                    onChangeText={setClientEmail}
                    placeholderTextColor='#4a9348'
                />
                 <TextInput
                    style={styles.inputData}
                    placeholder='Telefone'
                    autoCapitalize='words'
                    value={clientTelefone}
                    onChangeText={setClientTelefone}
                    placeholderTextColor='#4a9348'
                />
                <TextInput
                    style={styles.inputData}
                    placeholder='Logradouro'
                    autoCapitalize='words'
                    value={clientLogradouro}
                    onChangeText={setClientLogradouro}
                    placeholderTextColor='#4a9348'
                />
                 <TextInput
                    style={styles.inputData}
                    placeholder='Número'
                    autoCapitalize='words'
                    value={clientNumero}
                    onChangeText={setClientNumero}
                    placeholderTextColor='#4a9348'
                />

            <TextInput
                    style={styles.inputData}
                    placeholder='Complemento'
                    autoCapitalize='words'
                    value={clientComplemento}
                    onChangeText={setClientComplemento}
                    placeholderTextColor='#4a9348'
                />
                 <TextInput
                    style={styles.inputData}
                    placeholder='Bairro'
                    autoCapitalize='words'
                    value={clientBairro}
                    onChangeText={setClientBairro}
                    placeholderTextColor='#4a9348'
                />

                <View style={styles.editButtonsContainer}>
                    <View style={styles.editButtons}>
                        <Pressable style={styles.saveButton} onPress={registerClient}>
                            <Ionicons style={styles.icons} name="checkmark-outline" size={25} color={'white'} />
                        </Pressable>
                        <Pressable style={styles.cancelButton} onPress={manageClients}>
                            <Ionicons style={styles.icons} name="close-outline" size={25} color={'white'} />
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
    );
}