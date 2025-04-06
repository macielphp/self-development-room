export const getLessonsBySeason = async (seasonId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/seasons/${seasonId}/lessons`);
    if (!response.ok) throw new Error('Erro ao buscar lessons');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar lessons:', error);
    return [];
  }
};
