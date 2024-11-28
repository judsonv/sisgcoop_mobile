import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../src/styles';
import { auth, db } from '../src/firebase.config';
import { signOut } from 'firebase/auth';
import { query, collection, getDocs, where, deleteDoc, doc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [products, setProducts] = useState([]);
  const currentUser = auth.currentUser;
  const router = useRouter();
  const navigation = useNavigation();

  const handleEditProduct = (productId) => {
    navigation.navigate('editProduct', { productId });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Mostrar um alerta de confirmação
      Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja excluir este produto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            onPress: async () => {
              // Excluir o produto do banco de dados usando o productId
              await deleteDoc(doc(db, 'products', productId));
  
              // Atualizar o estado local filtrando o produto excluído
              setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  
              // Mover a mensagem de sucesso para fora do bloco try
              alert('Produto excluído com sucesso!');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting product: ', error);
      alert('Erro ao excluir o produto. Tente novamente mais tarde.');
    }
  };
  
  
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userEmail = currentUser.email;

        // Fetch products where isStallholder is equal to the user's email
        const querySnapshot = await getDocs(
          query(collection(db, 'products'), where('idStallholder', '==', userEmail))
        );

        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    if (currentUser != null) {
      fetchProducts();
    } else {
      alert('É necessário estar logado para utilizar este recurso!');
      router.replace('/');
    }
  }, [currentUser, router]);

  function home() {
    router.replace('/home');
  }

  function manageProducts() {
    router.replace('/manageProducts');
  }

  function profile() {
    router.replace('/profile');
  }

  function addProduct() {
    router.replace('/addProduct');
  }
  function manageClients() {
    router.replace('/manageClients');
  }
  function clients() {
    router.replace('/clients');
}

function manageClients() {
  router.replace('/manageClients');
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
    <View style={styles.productCard}>
      <Image source={{ uri: item.productPhoto }} style={styles.productImage} resizeMode="cover" />
      <View style={styles.productInfo}>
        <Text style={[styles.productText, styles.productName]}>{item.productName}</Text>
        <Text style={styles.productDescription}>Valor de compra: {item.productPurchase}</Text>
        <Text style={styles.productDescription}>Valor de venda: {item.productSale}</Text>
        <Text style={styles.productDescription}>Quantidade: {item.productQuantity}</Text>
      </View>
      <View style={styles.editButtons}>
        <TouchableOpacity
          style={styles.pencilButton}
          onPress={() => handleEditProduct(item.id)}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>



        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
        
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

      <Text style={styles.bodyTitle}>Produtos</Text>
      <View style={styles.containerAdd}>
        <Pressable onPress={addProduct} style={styles.addProduct}>
          <Ionicons name="add-outline" size={28} color={'white'} />
        </Pressable>
      </View>

      <View style={styles.table}>
      <FlatList
    data={products}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()} // Convertendo para string se necessário
    numColumns={2} // Display two cards per row
      />
      </View>
    </View>
  );
}
