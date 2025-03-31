export const fakeDatabase = {
    
    setUser: (email, password) => {
        
        localStorage.setItem('users', JSON.stringify([{ email, password }]));
    },

    getUserByEmail: (email) => {
       
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(user => user.email === email); 
    }
}