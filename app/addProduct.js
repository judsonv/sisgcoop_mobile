import { useState } from 'react';
import { Image, Pressable, Text, View, TextInput } from "react-native";
import { styles } from "../src/styles"
import { auth, db } from "../src/firebase.config"
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
    const [productPhoto, setProductPhoto] = useState('');
    const [productName, setProductName] = useState('');
    const [productPurchase, setProductPurchase] = useState('');
    const [productSale, setProductSale] = useState('');
    const [productQuantity, setProductQuantity] = useState('');

    async function registerProduct() {
        if (productPhoto === '' || productName === '' || productPurchase === '' || productSale === '' || productQuantity === '') {
            alert('Necessário preencher todos os campos!');
            return;
        }

        const currentUser = auth.currentUser;

        if (currentUser) {
            const userEmail = currentUser.email;

            const productsCollection = collection(db, 'products');
            const productsData = {
                productPhoto,
                productName,
                productPurchase,
                productSale,
                productQuantity,
                idStallholder: userEmail, // Set idStallholder to the user's email
            };

            try {
                await addDoc(productsCollection, productsData);
                alert('Produto ' + productName + ' adicionado com sucesso!');
                router.replace('/manageProducts');
            } catch (error) {
                console.error('Error adding product: ', error);
                alert('Erro ao adicionar o produto. Tente novamente mais tarde.');
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

    function manageProducts() {
        router.replace('/manageProducts');
    }

    function profile() {
        router.replace('/profile');
    }

    function addProduct() {
        router.replace('/addProduct');
    }
    function clients(){
        router.replace('/clients');
    }

    function manageClients(){
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

            <Text style={styles.bodyTitle}>Cadastro de Podutos</Text>

            <View style={styles.dataContainer}>
                <TextInput
                    style={styles.inputData}
                    placeholder='Link da Foto do Produto'
                    autoCapitalize='words'
                    onChangeText={setProductPhoto}
                    value={productPhoto}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.inputData}
                    placeholder='Nome do Produto'
                    autoCapitalize='words'
                    value={productName}
                    onChangeText={setProductName}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.inputData}
                    placeholder='Preço de Compra'
                    autoCapitalize='words'
                    value={productPurchase}
                    onChangeText={setProductPurchase}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.inputData}
                    placeholder='Preço de Venda'
                    autoCapitalize='words'
                    value={productSale}
                    onChangeText={setProductSale}
                    placeholderTextColor='#4a9348'
                />

                <TextInput
                    style={styles.inputData}
                    placeholder='Quantidade dísponivel'
                    autoCapitalize='words'
                    value={productQuantity}
                    onChangeText={setProductQuantity}
                    placeholderTextColor='#4a9348'
                />

                <View style={styles.editButtonsContainer}>
                    <View style={styles.editButtons}>
                        <Pressable style={styles.saveButton} onPress={registerProduct}>
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