import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Image, Pressable, Text, ScrollView, View, TouchableOpacity } from "react-native";
import { styles } from "../src/styles";
import { auth } from "../src/firebase.config";
import { signOut } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';

const DrawerExample = () => {
  const Drawer = createDrawerNavigator();

  const CustomHeader = ({ navigation }) => {
    return (
      <View style={{ backgroundColor: 'green', padding: 16, flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../assets/img/sislogo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.closeDrawer()} style={{ marginLeft: 'auto' }}>
          <Ionicons name="close-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => (
          <CustomDrawerContent {...props}>
            <Image
              source={require('../assets/img/sislogo.png')} // Substitua pelo caminho da sua imagem
              style={{ width: '100%', height: 150 }}
              resizeMode="cover"
            />
          </CustomDrawerContent>
        )}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Opção 1" 
          component={Option1Screen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cube-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Opção 2" 
          component={Option2Screen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Opção 3" 
          component={Option3Screen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};




const HomeScreen = ({ navigation }) => {
  const eventSlides = [
    require('../assets/img/c11.jpg'),
    require('../assets/img/c22.png'),
    require('../assets/img/c1.jpg'),
  ];

  /*const currentUser = auth.currentUser;

  if (currentUser != null) {
    // Usuário Logado
  } else {
    alert('É necessário estar logado para utilizar este recurso!');
    navigation.replace('/');
  }*/

  function home() {
    navigation.replace('/home');
  }

  function manageProducts() {
    navigation.replace('/manageProducts');
  }

  function profile() {
    navigation.replace('/profile');
  }

  function addClients() {
    navigation.replace('/addClients');
  }

  function manageClients() {
    navigation.replace('/manageClients');
  }

  /*function logout() {
    signOut(auth)
      .then(() => {
        alert('Você desconectou-se do sistema!');
        navigation.replace('/');
      })
      .catch((error) => {
        const errorMessage = error.errorMessage;
        alert(errorMessage);
      });
  }*/

  return (
    <View style={styles.internalContainer}>
      <View style={styles.topBar}>
        <View style={styles.iconsMenu}>
          <Pressable onPress={home}>
            <Ionicons style={styles.icons} name="home-outline" size={28} color={'white'} />
          </Pressable>

          <Pressable onPress={manageProducts}>
            <Ionicons style={styles.icons} name="cube-outline" size={28} color={'white'} />
          </Pressable>

          <Pressable onPress={profile}>
            <Ionicons style={styles.icons} name="person-outline" size={28} color={'white'} />
          </Pressable>

          <Pressable onPress={manageClients}>
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
    </View>
  );
};

const Option1Screen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Opção 1 Screen</Text>
    </View>
  );
};

const Option2Screen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Opção 2 Screen</Text>
    </View>
  );
};

const Option3Screen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Opção 3 Screen</Text>
    </View>
  );
};

export default DrawerExample;


