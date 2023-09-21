import React from 'react';
import { View, StyleSheet } from 'react-native';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
    const filledStars = Math.min(maxRating, Math.max(0, rating));
    const emptyStars = maxRating - filledStars;

    const renderStar = (filled: boolean) => (
        <View style={[styles.star]} key={Math.random()}>

        </View>
    );

    return (
        <View style={styles.ratingContainer}>
            {Array.from({ length: filledStars }, () => renderStar(true))}
            {Array.from({ length: emptyStars }, () => renderStar(false))}
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default StarRating;
