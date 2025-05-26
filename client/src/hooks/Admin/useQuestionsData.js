import React,{ useState } from 'react'
import { getAllLanguages } from '../../api/Admin/languagesApi';
import { getSeasonsByLanguageId } from '../../api/Admin/seasonsApi'
import { getLessonsBySeason } from "../../api/Admin/lessonsApi";
import { getQuestionsByLesson } from "../../api/Admin/questionsApi";
import { getAlternativesByQuestion } from "../../api/Admin/alternativesApi";

export const useQuestionsData = () => {
  const [languages, setLanguages] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [filters, setFilters] = useState({ language: 0, season: 0, lesson: 0 });

  const fetchLanguages = async () => setLanguages(await getAllLanguages());
  const fetchSeasons = async (langId) => {
    const response = await getSeasonsByLanguageId(langId);
    console.log('Fetched seasons for langId', langId, ':', response);
    setSeasons(response);
  }
  const fetchLessons = async (seasonId) => {
    const response = await getLessonsBySeason(seasonId);
    console.log('Fetched lessons for seasonId', seasonId, ':', response);
    setLessons(response);
  };

  const fetchQuestions = async (lessonId) => {
    try {
      const questionsData = await getQuestionsByLesson(lessonId);

      const questionsWithAlternatives = await Promise.all(
        questionsData.map(async (question) => {
          const alternatives = await getAlternativesByQuestion(question.id);
          console.log('Fetched alternatives for question', question.id, ':', alternatives); 
          return { ...question, alternatives };
        })
      )
      setQuestions(questionsWithAlternatives);
      console.log('Fetched questions for lessonId', lessonId, ':', questionsWithAlternatives);
    } catch (error){
      console.error('Erro ao buscar perguntas e alternativas', error)
    }
  };
  const fetchAlternatives = async (questionId) => {
    const response = await getAlternativesByQuestion(questionId)
    console.log('Fetched alternatives for questionId', questionId, ':', response);
    setAlternatives(response);
  }
  

  return {
    languages, seasons, lessons, questions, alternatives,
    fetchLanguages, fetchSeasons, fetchLessons, fetchQuestions, fetchAlternatives,
    filters, setFilters, setQuestions
  };
};
