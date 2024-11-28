import React, { useState, useEffect } from 'react';
import { View, Image, Text, Picker, TextInput, Pressable, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from "../src/styles"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import firebase from '../src/firebase.config';




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
const EstoqueScreen = () => {
    const [produtos, setProdutos] = useState([]);
    const [selectedProduto, setSelectedProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
  
    useEffect(() => {
      const fetchProdutos = async () => {
        try {
          console.log('Iniciando fetchProdutos');
          const produtosSnapshot = await firestore().collection( 'products').get();
          console.log('Dados do Firebase:', produtosSnapshot.docs.map(doc => doc.data()));
          const produtosArray = produtosSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('Produtos do Firebase:', produtosArray);
          setProdutos(produtosArray);
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };
  
      fetchProdutos();
    }, []);
  
    const atualizarEstoque = async () => {
      try {
        const produtoRef = firestore().collection('products').doc(selectedProduto);
        const produtoDoc = await produtoRef.get();
  
        if (produtoDoc.exists) {
          const quantVelha = produtoDoc.data().productQuantity;
          const quantNova = parseInt(quantidade);
          const quantAtual = quantVelha + quantNova;
  
          await produtoRef.update({ productQuantity: quantAtual });
  
          Alert.alert('Sucesso', 'Estoque atualizado com sucesso!');
          console.log('Estoque atualizado com sucesso!');
        } else {
          Alert.alert('Erro', 'Produto não encontrado!');
          console.log('Erro: Produto não encontrado!');
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao atualizar o estoque');
        console.error('Erro ao atualizar o estoque:', error);
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
                        onPress={profile}
                    >
                    <Ionicons style={styles.icons} name="person-outline" size={28} color={'white'} />
                    </Pressable>

                    
                    <Pressable
                        onPress={manageClients} 
                    >
                    <Ionicons style={styles.icons} name="people-outline" size={28} color={'white'} />
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
                     <Text style={styles.title3}>Atualizar Estoque</Text>
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
        placeholder="Quantidade a ser adicionada"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={(text) => setQuantidade(text)}
      />
      <TouchableOpacity style={styles.button3} onPress={atualizarEstoque}>
        <Text style={styles.buttonText3}>Atualizar Estoque</Text>
      </TouchableOpacity>
      </View>
                </View>
           
  );
    
};



export default EstoqueScreen;