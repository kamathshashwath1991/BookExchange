import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "./../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Image } from "@rneui/base";

const Home = () => {

    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "books"));
            const bookDataArray: any = [];

            querySnapshot.forEach((doc) => {
                // Add each document's data to the array
                bookDataArray.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Set the data array in your state
            setData(bookDataArray);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return <View style={styles.mainView}>
        <Text style={styles.heading}>Books NearBy</Text>
        <View style={styles.textInputView}>
            <TextInput
                value={searchInput}
                onChangeText={(value) => setSearchInput(value)}
                style={styles.textInput}
                placeholder='Enter book name'
                placeholderTextColor={"#000"} />
        </View>
        <View style={styles.mainPostView}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id} // Specify a unique key for each item
                renderItem={({ item }) => (
                    <View style={styles.postView}>
                        <View style={styles.postTitle}>
                            <View style={styles.imageView} >
                                <Image source={{ uri: item.imageLink }} />
                                <Text>Name & Title: {item.author}</Text>
                            </View>
                            <View><Text>Options</Text></View>

                        </View>
                    </View>
                )}
            />
        </View>
    </View>
}
export default Home;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    heading: {
        fontSize: 32,
        marginTop: 50,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    textInput: {
        width: '90%',
        borderWidth: 1,
        height: 39,
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: '#EBEBEB',
    },
    textInputView: {
        display: 'flex',
        alignItems: 'center'
    },
    mainPostView: {
        width: '100%',
    },
    postView: {
        width: '100%'
    },
    postTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'gray',
        flexDirection: 'row'
    },
    imageView: {
        width: '50%',
        display: 'flex'
    }
});