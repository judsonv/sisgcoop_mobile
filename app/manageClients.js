import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View, FlatList } from 'react-native';
import { styles } from '../src/styles';
import { auth, db } from '../src/firebase.config';
import { signOut } from 'firebase/auth';
import { query, collection, getDocs, where, deleteDoc, doc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [clients, setClients] = useState([]);
  const currentUser = auth.currentUser;
  const router = useRouter();
  const navigation = useNavigation();

  const handleEditClient = (clientId) => {
    navigation.navigate('editClients', { clientId });
  };

  const handleDeleteClient = async (clientId) => {
    try {
      // Mostrar um alerta de confirmação
      Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja excluir este cliente?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            onPress: async () => {
              // Excluir o produto do banco de dados usando o productId
              await deleteDoc(doc(db, 'clients', clientId));
  
              // Atualizar o estado local filtrando o produto excluído
              setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  
              // Mover a mensagem de sucesso para fora do bloco try
              alert('Cliente excluído com sucesso!');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting client: ', error);
      alert('Erro ao excluir o cliente. Tente novamente mais tarde.');
    }
  };
  
  
  

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const userId = currentUser.uid;

        // Fetch products where idClient is equal to the user's email
        const querySnapshot = await getDocs(
          query(collection(db, 'clients'), where('idClient', '==', userId))
        );

        const clientsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setClients(clientsData);  // Corrigido para setClients
      } catch (error) {
        console.error('Error fetching clients: ', error);
      }
    };

    if (currentUser != null) {
      fetchClients();
    } else {
      alert('É necessário estar logado para utilizar este recurso!');
      router.replace('/');
    }
}, [currentUser, router]);


  
  function home() {
    router.replace('/home');
  }

  function manageClients() {
    router.replace('/manageClients');
  }

  function profile() {
    router.replace('/profile');
  }

  function addClients() {
    router.replace('/addClients');
  }
  function addProduct() {
    router.replace('/addProduct');
  }
  function manageProducts() {
    router.replace('/manageProducts');
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

  const renderItem = ({ item }) => (
    <View style={styles.clientCard}>
      <Image source={{ uri: item.clientPhoto }} style={styles.clientImage} resizeMode="cover" />
      <View style={styles.clientInfo}>
        <Text style={[styles.clientText, styles.clientName]}>{item.clientName}</Text>
        <Text style={styles.clientCpf}>Cpf {item.clientCpf}</Text>
        <Text style={styles.clientGenero}>Genero: {item.clientGenero}</Text>
        <Text style={styles.clientData}>Data de nascimento: {item.clientData}</Text>
        <Text style={styles.clientEmail}>E-mail: {item.clientEmail}</Text>
        <Text style={styles.clientTelefone}>Telefone: {item.clientTelefone}</Text>
        <Text style={styles.clientLogradouro}>Logradouro: {item.clientLogradouro}</Text>
        <Text style={styles.clientNumero}>Número: {item.clientNumero}</Text>
        <Text style={styles.clientComplmento}>Complemento: {item.clientLogradouro}</Text>
        <Text style={styles.clientBairro}>Bairro: {item.clientBairro}</Text>
        
      </View>
      <View style={styles.editButtons}>

        <Pressable
          style={styles.pencilButton}
          onPress={() => handleEditClient(item.id)}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => handleDeleteClient(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </Pressable>

      </View>
    </View>
  );

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

          <Pressable onPress={manageClients}>
            <Ionicons style={styles.icons} name="people-outline" size={28} color={'#CCC'} />
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



      <Text style={styles.bodyTitle}>Clientes</Text>
      <View style={styles.containerAdd}>
        <Pressable onPress={addClients} style={styles.addClients}>
          <Ionicons name="add-outline" size={28} color={'white'} />
        </Pressable>
      </View>


      <View style={styles.table2}>
        <FlatList
          data={clients}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2} // Display two cards per row
        />
      </View>
    </View>
  );
}
