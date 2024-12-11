import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const TopicalQuestions = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (router.params && router.params.questions) {
        try {
          const questionsData = JSON.parse(router.params.questions);
          console.log("Parsed Questions:", questionsData); // Log the parsed data
          setQuestions(questionsData);
        } catch (error) {
          console.error("Error parsing questions data:", error);
        }
      } else {
        console.log("No questions in params.");  // Log if no questions are available in params
      }
      setLoading(false);
    };

    fetchData();
  }, [router.params]); // Trigger when router.params changes

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No questions available. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topical Questions</Text>
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text>{item.questionText}</Text> {/* Adjust according to your question structure */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginBottom: 10,
  },
});

export default TopicalQuestions;
