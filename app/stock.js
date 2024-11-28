import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { auth } from '../src/firebase.config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stock = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Item 1', quantity: 10 },
    { id: 2, name: 'Item 2', quantity: 5 },
    { id: 3, name: 'Item 3', quantity: 8 },
  ]);

  const currentUser = auth.currentUser;
  const router = useRouter();

  const handleAddItem = () => {
    const newItem = {
      id: stockItems.length + 1,
      name: selectedItem,
      quantity: parseInt(quantity) || 0,
    };

    const updatedStock = stockItems.map((item) => {
      if (item.name === newItem.name) {
        // Se já existir o mesmo item, adiciona a quantidade
        return { ...item, quantity: item.quantity + newItem.quantity };
      }
      return item;
    });

    const isExistingItem = updatedStock.some((item) => item.name === newItem.name);

    if (!isExistingItem) {
      // Se for um novo item, adiciona à lista
      setStockItems([...stockItems, newItem]);
    } else {
      // Se for um item existente, atualiza a lista
      setStockItems(updatedStock);
    }

    // Limpar os campos após adicionar o item
    setSelectedItem('');
    setQuantity('');
  };

  const handleLogout = () => {
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

    

  return (
    <View style={styles.container2}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.replace('/home')}>
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

                   


        {/* Adicionar outros botões de navegação aqui conforme necessário */}

        <Pressable onPress={handleLogout}>
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

      <Text style={styles.bodyTitle}>Estoque</Text>

      <View style={styles.formContainer}>
        <Picker
          selectedValue={selectedItem}
          onValueChange={(itemValue) => setSelectedItem(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um item" value="" />
          <Picker.Item label="Item 1" value="Item 1" />
          <Picker.Item label="Item 2" value="Item 2" />
          <Picker.Item label="Item 3" value="Item 3" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />

        <Pressable onPress={handleAddItem} style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar Item</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.stockContainer}>
        {stockItems.map((item) => (
          <View key={item.id} style={styles.stockItem}>
            <Text style={styles.stockItemName}>{item.name}</Text>
            <Text style={styles.stockItemQuantity}>Quantidade: {item.quantity}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... estilos existentes
  container2: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  icons: {
    marginRight: 16,
  },
  bodyTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3e8e41',
    margin: 30,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#4a9348',
    width: '90%',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 8,
    borderRadius: 8,
  },
  input: {
    paddingHorizontal: 8,
    fontSize: 21,
    borderColor: '#4a9348',
    borderWidth: 2,
    borderRadius: 8,
    width: '80%',
    padding: 10,
    margin: 10,
  },
  addButton: {
    backgroundColor: '#4a9348',
    width: '80%',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  stockContainer: {
    marginBottom: 16,
  },
  stockItem: {
    marginBottom: 8,
  },
  stockItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockItemQuantity: {
    fontSize: 16,
  },
  menuLogo: {
    alignItems: 'center',
},
logoImage: {
    width: 130,
    height: 70,
},
iconsMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
icons: {
    paddingHorizontal: 12,
},
logoContainer: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    
},
logo: {
    width: 350,
    height: 150,
    justifyContent: 'center',
},
topBar: {
    flexDirection: 'row-reverse',
    padding: 5,
    backgroundColor: '#3e8e41',
    width: '100%',
    justifyContent: 'space-between',
},
topBarButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
},

});

export default Stock;

