import React, { useEffect, useState, useRef } from "react";
import { updateDoc, doc, getDocs, query, where, collection } from "firebase/firestore";
import { auth, db } from "../src/firebase.config";
import { signOut } from "firebase/auth";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from "../src/styles";

export default function Home() {
    const currentUser = auth.currentUser;
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedBoothName, setEditedBoothName] = useState("");
    const [editedWhatsApp, setEditedWhatsApp] = useState("");
    const editedUserData = useRef(null);

    useEffect(() => {
        if (currentUser != null) {
            checkUserTable(currentUser.email);
        } else {
            alert('É necessário estar logado para utilizar este recurso!');
            router.replace('/');
        }
    }, [currentUser]);

    function home() {
        router.replace('/home');
    }

    function manageProducts() {
        router.replace('/manageProducts');
    }

    function profile(){
        router.replace('/profile');
    }

    function clients() {
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

    async function checkUserTable(email) {
        try {
            const stallholdersQuery = query(collection(db, 'stallholders'), where('userMail', '==', email));
            const stallholdersSnapshot = await getDocs(stallholdersQuery);

            if (!stallholdersSnapshot.empty) {
                const stallholdersData = stallholdersSnapshot.docs[0].data();
                setUserData({ ...stallholdersData, id: stallholdersSnapshot.docs[0].id });
            } else {
                const clientsQuery = query(collection(db, 'clients'), where('userMail', '==', email));
                const clientsSnapshot = await getDocs(clientsQuery);

                if (!clientsSnapshot.empty) {
                    const clientsData = clientsSnapshot.docs[0].data();
                    setUserData(clientsData);
                } else {
                    alert('Usuário não encontrado.');
                }
            }
        } catch (error) {
            console.error('Erro ao verificar a tabela do usuário:', error);
        }
    }

    async function updateUserDataInDatabase(updatedData) {
        try {
            const stallholdersDocRef = doc(db, 'stallholders', userData.id);
            await updateDoc(stallholdersDocRef, updatedData);
            console.log("Document updated successfully!");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    function startEditing() {
        setEditing(true);
        editedUserData.current = { boothName: userData.boothName, userWhatsApp: userData.userWhatsApp };
        setEditedBoothName(userData.boothName || "");
        setEditedWhatsApp(userData.userWhatsApp || "");
    }

    function cancelEditing() {
        setEditing(false);
        setEditedBoothName("");
        setEditedWhatsApp("");
    }

    async function saveChanges() {
        const updatedData = { boothName: editedBoothName, userWhatsApp: editedWhatsApp };
        await updateUserDataInDatabase(updatedData);

        setUserData((prevUserData) => ({
            ...prevUserData,
            boothName: editedBoothName,
            userWhatsApp: editedWhatsApp,
        }));

        setEditing(false);
    }

    return (
        <View style={styles.internalContainer}>
            <View style={styles.topBar}>
                <View style={styles.iconsMenu}>
                    <Pressable onPress={home}>
                        <Ionicons style={styles.icons} name="home-outline" size={28} color={'#CCC'} />
                    </Pressable>
                    <Pressable onPress={manageProducts}>
                        <Ionicons style={styles.icons} name="cube-outline" size={28} color={'#CCC'} />
                    </Pressable>
                    <Pressable onPress={profile}>
                        <Ionicons style={styles.icons} name="person-outline" size={28} color={'white'} />
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

            <Text style={styles.bodyTitle}>Perfil</Text>

            {userData && (
                <View style={styles.dataContainer}>
                    <Text style={styles.textData}>Nome: </Text>
                    <TextInput
                        style={styles.inputData}
                        value={userData.userName}
                        editable={false}
                    />

                    {userData.boothName ? (
                        <View>
                            <Text style={styles.textData}>Nome da Barraquinha: </Text>
                            {editing ? (
                                <TextInput
                                    style={styles.inputData}
                                    value={editedBoothName}
                                    onChangeText={setEditedBoothName}
                                />
                            ) : (
                                <Text style={styles.inputData}>{userData.boothName}</Text>
                            )}

                            <Text style={styles.textData}>WhatsApp: </Text>
                            {editing ? (
                                <TextInput
                                    style={styles.inputData}
                                    value={editedWhatsApp}
                                    onChangeText={setEditedWhatsApp}
                                />
                            ) : (
                                <Text style={styles.inputData}>{userData.userWhatsApp}</Text>
                            )}

                            <Text style={styles.textData}>Email: </Text>
                            <TextInput
                                style={styles.inputData}
                                value={userData.userMail}
                                editable={false}
                            />

                            <View style={styles.editButtonsContainer}>
                                {editing ? (
                                    <View style={styles.editButtons}>
                                        <Pressable style={styles.saveButton} onPress={saveChanges}>
                                            <Ionicons style={styles.icons} name="checkmark-outline" size={25} color={'white'} />
                                        </Pressable>
                                        <Pressable style={styles.cancelButton} onPress={cancelEditing}>
                                            <Ionicons style={styles.icons} name="close-outline" size={25} color={'white'} />
                                        </Pressable>
                                    </View>
                                ) : null}

                                {!editing && (
                                    <Pressable style={styles.pencilButton} onPress={startEditing}>
                                        <Ionicons style={styles.icons} name="create-outline" size={25} color={'white'} />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.textData}>Email: </Text>
                            <TextInput
                                style={styles.inputData}
                                value={userData.userMail}
                                editable={false}
                            />
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}
