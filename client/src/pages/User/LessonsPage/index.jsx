import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getLessonsBySeason } from '../api/lessonsApi';
import { Box, Typography, Card, CardContent, Accordian, AccordianSummary, AccordianDetails, Button } from '@mui/material';
import PersistentDrawer from './../../components/PersistentDrawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LessonsPage = () => {
  const { seasonId } = useParams();
  const [lessons, setLessons] = useState([]);
  
  useEffect(() => {
    const fetchLessons = async () => {
      const data = await getLessonsBySeason(seasonId)
      setLessons(data);
    };
    fetchLessons();
    console.log(`fetchLessons: ${fetchLessons}`)
  }, [seasonId]);

  return (
    <>
      <PersistentDrawer />
      <Box>
          <Box mt={2}>
            <Typography variant="h5" gutterBottom>Lessons for Season {seasonId}</Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isFirst = index === 0;
                const previousLessonCompleted = index === 0 || completedLessons.includes(lessons[index - 1]?.id);
                const isUnlocked = isFirst || previousLessonCompleted;
                return (
                  <Card
                    key={lesson.id}
                    sx={{
                      width: '80%',
                      opacity: isUnlocked ? 1 : 0.5,
                      border: isCompleted
                        ? '2px solid green'
                        : isUnlocked
                        ? '2px solid blue'
                        : '2px solid gray',
                    }}
                  >
                    <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}rel="noopener" >
                      <CardContent>
                        <Typography variant="h6">{lesson.title}</Typography>
                        {isCompleted && <p>✅ Concluída</p>}
                        {!isCompleted && isUnlocked && (
                            <Box display="flex" alignItems="center" gap={1} cursor='pointer'>
                              {/* <SportsScoreIcon />
                              <Typography>Start</Typography> */}
                            </Box>
                        )}
                        {/* {!isUnlocked && <p><BlockIcon /> Locked</p>} */}
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </Box>
          </Box>        
      </Box>
    </>
  )
}

export default LessonsPage