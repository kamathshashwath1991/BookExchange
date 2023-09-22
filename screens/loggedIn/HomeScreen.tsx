import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "./../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Image } from "@rneui/base";
import StarRating from "../../components/rating";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const Home = (props: any) => {
    const { navigation } = props;
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
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Image source={{ uri: item.imageLink }} style={styles.cardImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text>ListedBy: {item.listedBy}</Text>
                                <Text>Condition: {item.condition}</Text>
                                <Text>ISBN: {item.isbn}</Text>
                                <StarRating rating={item.rating} />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Details'); // Navigate to DetailsScreen with book data   { book: item.description }
                            }}
                            style={styles.arrowContainer}
                        >
                            <FontAwesomeIcon name='picture-o' size={30} color="#841777" />
                        </TouchableOpacity>
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 10,
        flexDirection: 'row'
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    textContainer: {
        marginLeft: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 24,
        color: 'gold',
        marginRight: 2,
    },
    filledStar: {
        color: 'gold',
    },
    arrowContainer: {
        padding: 10,
    },
});