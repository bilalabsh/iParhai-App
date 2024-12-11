import axios from "axios";

export const getQuestionsBySubtopics = async (subtopics) => {
  try {
    const cleanedSubtopics = subtopics.map((sub) =>
      sub.replace(/^\d+\.\d+\s*/, "").trim()
    );
    const url = `http://localhost:5000/questions/subtopic/${cleanedSubtopics.join(
      ","
    )}`;
    console.log("API Request URL:", url); // Log the cleaned URL
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
