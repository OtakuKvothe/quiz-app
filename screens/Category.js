import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Title from '../components/Title';

const indices = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
const topics =
    [
        'General Knowledge',
        'Entertainment: Books',
        'Entertainment: Film',
        'Entertainment: Music',
        'Entertainment: Musicals & Theatres',
        'Entertainment: Television',
        'Entertainment: Video Games',
        'Entertainment: Board Games',
        'Science & Nature',
        'Science: Computers',
        'Science: Mathematics',
        'Mythology',
        'Sports',
        'Geography',
        'History',
        'Politics',
        'Art',
        'Celebrities',
        'Animals',
        'Vehicles',
        'Entertainment: Comics',
        'Science: Gadgets',
        'Entertainment: Japanese Anime & Manga',
        'Entertainment: Cartoon'
    ];

const Category = ({ navigation }) => {
    let selection = 0;

    const renderItem = ({ index }) => {
        let option = topics[index];
        return (
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => {
                    selection = indices[index];
                    handleStartQuiz();
                }}>
                <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
        );
    }

    const handleStartQuiz = () => {
        selection > 0 && navigation.navigate('Quiz', {
            topic: selection
        });
    }

    return (
        <View style={styles.container}>
            <Title titleText='Category' />
            <View style={styles.options}>
                <FlatList
                    data={indices}
                    renderItem={renderItem}
                    keyExtractor={(index) => index.toString()}
                />
            </View>
        </View>
    );
}

export default Category;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    top: {
        marginVertical: 16,
    },
    options: {
        marginVertical: 16,
        flex: 1,
    },
    bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#1A759F',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    question: {
        fontSize: 28,
    },
    option: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        backgroundColor: '#34A0A4',
        paddingHorizontal: 12,
        borderRadius: 12,
        color: 'white'
    },
    parent: {
        height: '100%',
    },
});