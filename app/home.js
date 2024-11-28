import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, ScrollView, View } from "react-native";
import { styles } from "../src/styles";
import { auth, db } from "../src/firebase.config"; // Certifique-se de importar db
import { signOut } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";

export default function Home() {
    const eventSlides = [
        require('../assets/img/c11.jpg'),
        require('../assets/img/c22.png'),
        require('../assets/img/c1.jpg'),
    ];
    const [products, setProducts] = useState([]);
    const currentUser = auth.currentUser;

    useEffect(() => {
        // Função para buscar os produtos do Firestore
        const fetchProducts = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
          } catch (error) {
            console.error('Error fetching products: ', error);
          }
        };
    
        fetchProducts();
      }, [db, 'products']); // Dependências vazias, significa que será executado apenas uma vez no montar do componente
    

    


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

   

    function addClients(){
        router.replace('/addClients');
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
                <Pressable
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <Ionicons style={styles.icons} name="menu-outline" size={28} color={'white'} />
                </Pressable>
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
                        onPress={logout}
                    >
                        <Ionicons style={styles.icons} name="log-out-outline" size={32} color={'white'} />
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

            <Text style={styles.bodyTitle}>Eventos</Text>


            <View style={styles.sliderContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.slider}
                >
                    {eventSlides.map((slide, index) => (
                        <View key={index} style={styles.slideItem}>
                            <Image source={slide} style={styles.image} resizeMode="cover" />
                        </View>
                    ))}
                </ScrollView>
            </View>

            <Text style={styles.bodyTitle}>Produtos</Text>
            <View style={styles.tableBuy}>
            <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            {/* Adicione outros detalhes do produto conforme necessário */}
          </View>
        )}
      />
    </View>
    </View>
  );
}