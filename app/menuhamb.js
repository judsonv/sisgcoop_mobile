import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Header = ({logo, leftItem, rightItem, title, navigation}) => {
 return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation && navigation.openDrawer()}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation && navigation.navigate(rightItem)}>
        <Image source={require('../assets/img/sislogo.png')} style={styles.user} />
      </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
 header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'black',
 },
 logo: {
    width: 80,
    height: 20,
 },
 title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
 },
 user: {
    width: 30,
    height: 30,
 },
});

export default Header;