import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const Quiz = ({ navigation, route }) => {
    const [questions, setQuestions] = useState();
    const [ques, setQues] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { topic } = route.params;
    console.log(topic);

    const getQuiz = async () => {
        setIsLoading(true);
        const url = `https://opentdb.com/api.php?amount=10&category=${topic}&type=multiple&encode=url3986`;
        const res = await fetch(url);
        const data = await res.json();
        setQuestions(data.results);
        setOptions(generateOptionsAndShuffle(data.results[0]));
        setIsLoading(false);
    }

    useEffect(() => {
        getQuiz();
    }, []);

    const handleNextPress = () => {
        setQues(ques + 1);
        setOptions(generateOptionsAndShuffle(questions[ques+1]));
    }

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers];
        options.push(_question.correct_answer);

        shuffleArray(options);

        return options;
    }

    const handleSelectedOption = (_option) => {
        if (_option === questions[ques].correct_answer) {
            setScore(score + 10);
        }
        if (ques !== 9) {
            setQues(ques + 1);
            setOptions(generateOptionsAndShuffle(questions[ques+1]));
        }
        if (ques === 9) {
            handleShowResult();
        }
    }

    const handleShowResult = () => {
        navigation.navigate('Result', {
            score: score
        });
    }

    const quizSection = () => {
        return (
            <View style={styles.parent}>
                <View style={styles.top}>
                    <Text style={styles.question}>
                        Q. {decodeURIComponent(questions[ques].question)}
                    </Text>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleSelectedOption(options[0])}
                    >
                        <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleSelectedOption(options[1])}
                    >
                        <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleSelectedOption(options[2])}
                    >
                        <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleSelectedOption(options[3])}
                    >
                        <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    {ques !== 9 &&
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleNextPress}
                        >
                            <Text style={styles.buttonText}>SKIP</Text>
                        </TouchableOpacity>
                    }

                    {ques === 9 &&
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleShowResult}
                        >
                            <Text style={styles.buttonText}>SHOW RESULTS</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size='large' /> : questions && quizSection()}
        </View>
    );
}

export default Quiz;

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
    },
    parent: {
        height: '100%',
    },
});