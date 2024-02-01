class LocalStorage {
    getItem(key) {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    }
    
    setItem(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    removeItem(key) {
        localStorage.removeItem(key);
    }
}

export default new LocalStorage();