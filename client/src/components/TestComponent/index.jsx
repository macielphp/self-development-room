import { useEffect } from 'react';
import { getLessonsBySeason } from '../../api/lessonsApi'; // ajuste o caminho conforme necessário

const TestComponent = () => {
  useEffect(() => {
    const fetchLessons = async () => {
      const lessons = await getLessonsBySeason(1);
      console.log('Lições da temporada 1:', lessons);
    };

    fetchLessons();
  }, []);

return <div>Testing lessons request...</div>;
};

export default TestComponent;
