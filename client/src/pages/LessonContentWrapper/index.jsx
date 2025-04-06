// Import React and hooks used for managing component state and side effects
import React, { useEffect, useState } from 'react';
// Import useParams to access URL parameters (like lessonId)
import { useParams } from 'react-router-dom';
// Import the LessonContent component, which will display the video and questions
import LessonContent from '../../components/LessonContent'; 

// Component that loads and displays the lesson content based on the lessonId in the URL
const LessonContentWrapper = () => {

  // Get the lessonId from the URL using React Router
  const { lessonId } = useParams(); 

  // State to hold the lesson data
  const [lesson, setLesson] = useState(null);

   // State to hold the list of questions for the lesson
  const [questions, setQuestions] = useState([]);

  // State to track whether data is still being loaded
  const [loading, setLoading] = useState(true);

  // Function to convert a regular YouTube URL to an embeddable URL format
  const convertToEmbedUrl = (url) => {
    const match = url.match(/v=([^&]+)/);  // Extract the video ID from the URL
    return match ? `https://www.youtube.com/embed/${match[1]}?modestbranding=1&rel=0&controls=1` : url // Return embedded URL or original if not matched
  };

   // useEffect runs after the component mounts or when lessonId changes
  useEffect(() => {
    
    // Function to fetch lesson and question data from the backend
    const fetchLessonData = async () => {
      try {
         // Request lesson data from the backend API
        const lessonRes = await fetch(`http://localhost:3001/api/lessons/${lessonId}`);

        // Request questions related to the lesson
        const questionsRes = await fetch(`http://localhost:3001/api/questions/byLesson/${lessonId}`);

         // Convert the lesson response to JSON
        const lessonData = await lessonRes.json();

        // Convert the questions response to JSON
        const questionsData = await questionsRes.json();

        // Save the lesson data to state
        setLesson(lessonData);
        
        // Save the questions to state
        setQuestions(questionsData);
      } catch (err) {
         // Log any error that occurs during the fetch
        console.error('Error in loading the lesson:', err);
      } finally {
        // Set loading to false whether or not the fetch was successful
        setLoading(false);
      }
    };

    // Call the function to fetch data
    fetchLessonData();
  }, [lessonId]);  // Re-run this effect if lessonId changes

   // If the data is still loading, show a loading message
  if (loading) return <p>Loading...</p>;

   // If the lesson is not found (null), show an error message
  if (!lesson) return <p>Lesson not found</p>;

  // Convert the lesson's video URL into an embed-friendly URL
  const embedUrl = convertToEmbedUrl(lesson.lesson_content);

   // Render the LessonContent component with the video and questions passed as props
  return <LessonContent videoUrl={embedUrl} questions={questions} />;
};

// Export the component so it can be used in other parts of the app
export default LessonContentWrapper;
