import React, { useEffect, useState } from 'react'
import {Box, Typography } from '@mui/material';
import PersistentDrawer from '../../components/PersistentDrawer';
import MediaCard from '../../components/MediaCard';
import defaultImage from './../../assets/statue-liberty-liberty-island-new-york.jpg';
import { getAllSeasons } from '../../api/seasonsApi'
import { getLessonsBySeason } from '../../api/lessonsApi';
import { useNavigate } from 'react-router-dom';


const SeasonsPage = () => {
  const [seasons, setSeasons] = useState([])
  const [loadingSeasons, setLoadingSeasons] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeasons = async () => {
      const data = await getAllSeasons();
      setSeasons(data)
      setLoadingSeasons(false);
    }
    fetchSeasons();
  }, []);

  const handleStartSeason = async (seasonId) => {
    try {
      const [lessonsData, progressRes] = await Promise.all([
        getLessonsBySeason(seasonId), // Fetch lessons for the selected season
        fetch(`http://localhost:3001/api/progress/1`) // Fetch the user's progress (user ID is hardcoded here as 1)
      ]);
      // Parse the progress response into JSON
      const progressData = await progressRes.json();
      // Extract only the IDs of the completed lesson
      const completedLessonIds = progressData.map((p) => p.lesson_id);
  
      // Update state with the lessons and completed lesson IDs
      localStorage.setItem('lessons', JSON.stringify(lessonsData));
      localStorage.setItem('completedLessons', JSON.stringify(completedLessonIds));
      localStorage.setItem('seasonId', seasonId)
      navigate('/lessons')
    } catch (err) {
      console.error("Erro ao buscar lições e progresso:", err);
    }
  };

  return (
    <>
      <PersistentDrawer />
      <Box>
        <Typography variant='h5'>Seasons</Typography>
        <Box display='flex' flexWrap='wrap' justifyContent='center'>
          {loadingSeasons ? (
            <Typography>Loading Seasons...</Typography>
          ) : (
            seasons.map((season) => (
              <Box>
                <MediaCard 
                  title={season.title}
                  description={season.description}
                  image={defaultImage}
                  actionLabel={season.id === 1 ? 'Start' : 'Locked'}
                  onActionClick={() =>
                    season.id === 1
                      ? handleStartSeason(season.id)
                      : alert(`Finish Season ${season.id - 1} to unlock this one!`)
                  } 
                />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  )
}

export default SeasonsPage