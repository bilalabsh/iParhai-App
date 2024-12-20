import axios from "axios";

const getQuestionsByQuestionNumber = async (season, paperNumber, year) => {
  try {
    const url = `http://192.168.18.53:5000/api/${season}/${paperNumber}/${year}/`;
    console.log("API Request URL:", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};


const getQuestionsBySubtopics = async (subtopics) => {
  try {
    const cleanedSubtopics = subtopics.map((sub) =>
      sub.replace(/^\d+\.\d+\s*/, "").trim()
    );
    const url = `http://192.168.18.53:5000/questions/subtopic/${cleanedSubtopics.join(
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

export { getQuestionsByQuestionNumber, getQuestionsBySubtopics };