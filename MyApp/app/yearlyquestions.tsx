import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: "1",
      question: "Which word is the name of a vector quantity?",
      image: null,
      options: ["density", "displacement", "energy", "speed"],
      answer: "displacement",
      selectedOption: null,
      showAnswer: false,
    },
    {
      id: "2",
      question: "What is the size of the resultant of the two forces shown in the diagram?",
      image: "https://utfs.io/f/HdnjclN1lG3zhbAaXhJIEGCfp04UgoDAMtVrSuNKWn9QcT6v",
      options: ["1.0 N", "3.5 N", "5.0 N", "7.0 N"],
      answer: "5.0 N",
      selectedOption: null,
      showAnswer: false,
    },
    {
      id: "3",
      question:
        "An object is placed at a distance from a converging lens that is equal to twice the focal length of the lens. Which statement about the image is correct?",
      image: null,
      options: [
        "It is enlarged",
        "It is inverted",
        "It is on the same side of the lens as the object",
        "It is virtual",
      ],
      answer: "It is inverted",
      selectedOption: null,
      showAnswer: false,
    },
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

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

    setSelectedAnswers((prevSelected) => {
      const updatedAnswers = prevSelected.filter((ans) => ans.id !== questionId);
      return [...updatedAnswers, { id: questionId, selectedOption: option }];
    });
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{`Q${item.id}) ${item.question}`}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.questionImage} />
      )}
      {item.options.map((option, index) => (
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
        keyExtractor={(item) => item.id}
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

export default QuestionsPage;