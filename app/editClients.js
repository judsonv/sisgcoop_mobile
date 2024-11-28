import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View, TextInput } from 'react-native';
import { styles } from '../src/styles';
import { auth, db } from '../src/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';  // Certifique-se de importar o useRouter do expo-router
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function EditClient() {
  const route = useRoute();
  const clientId = route.params?.clientId;

  console.log('Client ID:', clientId);

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

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientDoc = await getDoc(doc(db, 'clients', clientId));
        if (clientDoc.exists()) {
        const clientData = clientDoc.data();
        setClientPhoto(clientData.clientPhoto);
        setClientName(clientData.clientName);
        setClientCpf(clientData.clientCpf);
        setClientGenero(clientData.clientGenero);
        setClientData(clientData.clientData);
        setClientEmail(clientData.clientEmail);
        setClientTelefone(clientData.clientTelefone);
        setClientLogradouro(clientData.clientLogradouro);
        setClientNumero(clientData.clientNumero);
        setClientComplemento(clientData.clientComplemento);
        setClientBairro(clientData.clientBairro);

        } else {
          console.error('Client not found');
          // Handle product not found error
        }
      } catch (error) {
        console.error('Error fetching client data: ', error);
        // Handle error
      }
    };

    fetchClientData();
  }, [clientId]);

  const updateClient = async () => {
    // Validate input fields
    if (clientPhoto === '' || clientName === '' || clientCpf === '' || clientGenero === '' || clientData=== '' || clientEmail === ''
    || clientTelefone === '' || clientLogradouro === '' || clientNumero === '' || clientComplemento === '' || clientBairro === '' ) {
       alert('Necessário preencher todos os campos!');
       return;
    }

    // Update product data in the database
    try {
      const clientRef = doc(db, 'clients', clientId);
      await updateDoc(clientRef, {
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
      });

      alert('Cliente atualizado com sucesso!');
      router.replace('/manageClients');
    } catch (error) {
      console.error('Error updating client: ', error);
      alert('Erro ao atualizar o client. Tente novamente mais tarde.');
    }
  };

  const router = useRouter();

  const home = () => {
    router.replace('/home');
  };

  const manageProducts = () => {
    router.replace('/manageProducts');
  };

  const profile = () => {
    router.replace('/profile');
  };

  function addProduct() {
    router.replace('/addProduct');
  }

  function clients() {
    router.replace('/clients');
}

function manageClients() {
  router.replace('/manageClients');
}

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert('Você desconectou-se do sistema!');
        router.replace('/');
      })
      .catch((error) => {
        const errorMessage = error.errorMessage;
        alert(errorMessage);
      });
  };

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
          <Pressable onPress={profile}>
            <Ionicons style={styles.icons} name="person-outline" size={28} color={'#CCC'} />
          </Pressable>
          <Pressable
          onPress={manageClients} 
          >
          <Ionicons style={styles.icons} name="people-outline" size={32} color={'#CCC'} />
          </Pressable>
          <Pressable onPress={logout}>
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

      <Text style={styles.bodyTitle}>Edição de Clientes</Text>

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
            <Pressable style={styles.saveButton} onPress={updateClient}>
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
