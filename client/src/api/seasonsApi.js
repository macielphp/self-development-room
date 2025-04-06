export const getAllSeasons = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/seasons');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch(error) {
        console.error('Error fetching seasons:', error);
        return [];
    }
}