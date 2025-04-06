export const getLessonsBySeason = async (seasonId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/seasons/${seasonId}/lessons`);
      if (!response.ok) {
        throw new Error('Erro ao buscar lições');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição das lições:', error);
      return null;
    }
  };