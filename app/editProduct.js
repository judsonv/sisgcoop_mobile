import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View, TextInput } from 'react-native';
import { styles } from '../src/styles';
import { auth, db } from '../src/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';  // Certifique-se de importar o useRouter do expo-router
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function EditProduct() {
  const route = useRoute();
  const productId = route.params?.productId;

  console.log('Product ID:', productId);

  const [productPhoto, setProductPhoto] = useState('');
  const [productName, setProductName] = useState('');
  const [productPurchase, setProductPurchase] = useState('');
  const [productSale, setProductSale] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', productId));
        if (productDoc.exists()) {
          const productData = productDoc.data();
          setProductPhoto(productData.productPhoto);
          setProductName(productData.productName);
          setProductPurchase(productData.productPurchase);
          setProductSale(productData.productSale);
          setProductQuantity(productData.productQuantity);
        } else {
          console.error('Product not found');
          // Handle product not found error
        }
      } catch (error) {
        console.error('Error fetching product data: ', error);
        // Handle error
      }
    };

    fetchProductData();
  }, [productId]);

  const updateProduct = async () => {
    // Validate input fields
    if (productName === '' || productPurchase === '' || productSale === '' || productQuantity === '') {
      alert('Necessário preencher todos os campos!');
      return;
    }

    // Update product data in the database
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        productPhoto,
        productName,
        productPurchase,
        productSale,
        productQuantity,
      });

      alert('Produto atualizado com sucesso!');
      router.replace('/manageProducts');
    } catch (error) {
      console.error('Error updating product: ', error);
      alert('Erro ao atualizar o produto. Tente novamente mais tarde.');
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

      <Text style={styles.bodyTitle}>Edição de Produto</Text>

      <View style={styles.dataContainer}>
        <TextInput
          style={styles.inputData}
          placeholder='Link da Foto do Produto'
          autoCapitalize='words'
          onChangeText={setProductPhoto}
          value={productPhoto}
          placeholderTextColor='#CCC'
        />
        <TextInput
          style={styles.inputData}
          placeholder='Nome do Produto'
          autoCapitalize='words'
          value={productName}
          onChangeText={setProductName}
          placeholderTextColor='#CCC'
        />
        <TextInput
          style={styles.inputData}
          placeholder='Preço de Compra'
          autoCapitalize='words'
          value={productPurchase}
          onChangeText={setProductPurchase}
          placeholderTextColor='#CCC'
        />
        <TextInput
          style={styles.inputData}
          placeholder='Preço de Venda'
          autoCapitalize='words'
          value={productSale}
          onChangeText={setProductSale}
          placeholderTextColor='#CCC'
        />
        <TextInput
          style={styles.inputData}
          placeholder='Quantidade disponível'
          autoCapitalize='words'
          value={productQuantity}
          onChangeText={setProductQuantity}
          placeholderTextColor='#CCC'
        />

        <View style={styles.editButtonsContainer}>
          <View style={styles.editButtons}>
            <Pressable style={styles.saveButton} onPress={updateProduct}>
              <Ionicons style={styles.icons} name="checkmark-outline" size={25} color={'white'} />
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={manageProducts}>
              <Ionicons style={styles.icons} name="close-outline" size={25} color={'white'} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
