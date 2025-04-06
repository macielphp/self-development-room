export const fakeDatabase = {
    
    setUser: (firstName, lastName ,email, password, profilePicture = null) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ firstName, lastName, email, password, profilePicture });
        localStorage.setItem('users', JSON.stringify(users));
    },

    getUserByEmail: (email) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(user => user.email === email); 
    }
}