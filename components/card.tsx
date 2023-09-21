import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import StarRating from './rating';

interface CardProps {
    imageUrl: string;
    name: string;
    rating: number;
}

const Card: React.FC<CardProps> = ({ imageUrl, name, rating }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    <StarRating rating={rating} maxRating={5} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default Card;
