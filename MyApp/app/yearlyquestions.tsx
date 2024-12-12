import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const YearlyQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestionsFromStorage = async () => {
      try {
        const storedQuestions = await AsyncStorage.getItem("questions"); // Fetch questions from AsyncStorage
        if (storedQuestions) {
          const parsedQuestions = JSON.parse(storedQuestions);
          setQuestions(
            parsedQuestions.map((q, index) => ({
              id: index.toString(), // Assign a unique ID to each question
              question: q.Question, // Question text
              image: q.image_q || null, // Image for the question (if available)
              options: Object.values(q.Options), // Options for the question
              answer: q.answer, // Correct answer
              image2: q.image_o || null, // Image for the options (if available)
              selectedOption: null, // Selected option by the user
              showAnswer: false, // Whether to show the answer
            }))
          );
        }
      } catch (error) {
        console.error("Error retrieving questions from AsyncStorage:", error);
      }
    };

    fetchQuestionsFromStorage();
  }, []);

  const toggleAnswer = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, showAnswer: !q.showAnswer } : q
      )
    );
  };

  const selectOption = (questionId, option) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, selectedOption: option } : q
      )
    );
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{`Q${Number(item.id) + 1})`} ${item.question}`}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.questionImage} />
      )}
      {item.image2 && (
        <Image source={{ uri: item.image2 }} style={styles.questionImage} />
      )}
      {(item.image2 ? ["A", "B", "C", "D"] : item.options).map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionContainer,
            item.selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => selectOption(item.id, option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {item.showAnswer && (
        <Text style={styles.answerText}>{`Answer: ${item.answer}`}</Text>
      )}
      <TouchableOpacity
        style={styles.showAnswerButton}
        onPress={() => toggleAnswer(item.id)}
      >
        <Text style={styles.showAnswerText}>
          {item.showAnswer ? "Hide Answer" : "Show Answer"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Yearly Solved Paper</Text>
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  listContainer: {
    padding: 10,
  },
  questionCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  questionImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  optionContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: "#4c6ef5",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  answerText: {
    fontSize: 14,
    color: "green",
    marginTop: 10,
  },
  showAnswerButton: {
    marginTop: 10,
    backgroundColor: "#4c6ef5",
    paddingVertical: 10,
    borderRadius: 5,
  },
  showAnswerText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default YearlyQuestions;