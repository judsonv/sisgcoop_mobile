import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, Picker, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from "../src/styles"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import firebase from 'firebase/app';
import 'firebase/database';


function home() {
    router.replace('/home');
}

function manageProducts() {
    router.replace('/manageProducts');
}

function profile() {
    router.replace('/profile');
}



function addClients(){
    router.replace('/addClients');
}
function manageClients(){
    router.replace('/manageClients');
}

function estoque(){
    router.replace('/estoque');
}

function vendas(){
    router.replace('/vendas');
}



const router = useRouter();

const VendasScreen = () => {
  const [selectedProduto, setSelectedProduto] = useState('');
 const [quantidade, setQuantidade] = useState('');
 const [valorVenda, setValorVenda] = useState(0);
 const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        console.log('Iniciando busca de produtos...');
  
        const produtosSnapshot = await firestore().collection('products').get();
        const produtosArray = produtosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log('Produtos obtidos:', produtosArray);
  
        setProdutos(produtosArray);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
  
    fetchProdutos();
  }, []);

  const realizarVenda = async () => {
    try {
      const produtoRef = firestore().collection('products').doc(selectedProduto);
      const produtoDoc = await produtoRef.get();

      if (produtoDoc.exists) {
        const quantVelha = produtoDoc.data().productQuantity;
        const quantVendida = parseInt(quantidade);

        if (quantVendida <= quantVelha) {
          const quantAtual = quantVelha - quantVendida;

          await produtoRef.update({ productQuantity: quantAtual });

          const valorVendaAtualizado = valorVenda + (quantVendida * produtoDoc.data().productSale);
          setValorVenda(valorVendaAtualizado);

          Alert.alert('Sucesso', 'Venda realizada com sucesso!');
          console.log('Venda realizada com sucesso!');
        } else {
          Alert.alert('Erro', 'Quantidade insuficiente em estoque!');
          console.log('Erro: Quantidade insuficiente em estoque!');
        }
      } else {
        Alert.alert('Erro', 'Produto não encontrado!');
        console.log('Erro: Produto não encontrado!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao realizar a venda');
      console.error('Erro ao realizar a venda:', error);
    }
  };

  return (
    <View style={styles.internalContainer}>
            <View style={styles.topBar}>
                <View style={styles.iconsMenu}>
                    <Pressable
                        onPress={home}
                    >
                        <Ionicons style={styles.icons} name="home-outline" size={28} color={'white'} />
                    </Pressable>

                    <Pressable
                        onPress={manageProducts}
                    >
                        <Ionicons style={styles.icons} name="cube-outline" size={28} color={'white'} />
                    </Pressable>

                    <Pressable
                        onPress={estoque} 
                    >
                    <Ionicons style={styles.icons} name="grid-outline" size={28} color={'white'} />
                    </Pressable>

                    <Pressable
                        onPress={vendas} 
                    >
                    <Ionicons style={styles.icons} name="cash-outline" size={28} color={'white'} />
                    </Pressable>

                    
                    <Pressable
                        onPress={profile}
                    >
                    <Ionicons style={styles.icons} name="person-outline" size={28} color={'white'} />
                    </Pressable>

                    
                    <Pressable
                        onPress={manageClients} 
                    >
                    <Ionicons style={styles.icons} name="people-outline" size={28} color={'white'} />
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

    <View style={styles.internalContainer}>
      <Text style={styles.title3}>Realizar Venda</Text>
      <Picker
        selectedValue={selectedProduto}
        onValueChange={(itemValue) => setSelectedProduto(itemValue)}
        style={styles.picker3}
      >
        <Picker.Item label="Selecione o produto" value="" />
        {produtos.map((produto) => (
          <Picker.Item key={produto.id} label={produto.productName} value={produto.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input3}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={(text) => setQuantidade(text)}
      />
     
      <TouchableOpacity style={styles.button3} onPress={realizarVenda}>
        <Text style={styles.buttonText3}>Atualizar</Text>
      </TouchableOpacity>
      
      <Text style={styles.title3}>Valor Total das Vendas: R${valorVenda.toFixed(2)}</Text>
    </View>
    </View>
  );
};

export default VendasScreen;
