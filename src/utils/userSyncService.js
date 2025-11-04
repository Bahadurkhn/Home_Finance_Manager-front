// User Sync Service - Shares users between frontend and admin panel
class UserSyncService {
    constructor() {
        this.storageKey = 'finance_users';
        this.init();
    }

    init() {
        console.log('✅ User Sync Service initialized');
    }

    // Get all users (used by both frontend and admin panel)
    getAllUsers() {
        try {
            const usersData = localStorage.getItem(this.storageKey);
            if (usersData) {
                const users = JSON.parse(usersData);
                return Array.isArray(users) ? users : [];
            }
            return [];
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    }

    // Add user from frontend (also available to admin panel)
    addUser(userData) {
        try {
            const users = this.getAllUsers();
            const newUser = {
                id: Date.now(),
                ...userData,
                status: 'active',
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem(this.storageKey, JSON.stringify(users));
            
            console.log('✅ User added to shared storage:', newUser);
            return newUser;
        } catch (error) {
            console.error('Error adding user:', error);
            return null;
        }
    }

    // Remove user (used by admin panel)
    removeUser(userId) {
        try {
            const users = this.getAllUsers().filter(user => user.id !== userId);
            localStorage.setItem(this.storageKey, JSON.stringify(users));
            console.log('✅ User removed:', userId);
            return true;
        } catch (error) {
            console.error('Error removing user:', error);
            return false;
        }
    }

    // Sync from backend (if you have backend users)
    syncFromBackend(backendUsers) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(backendUsers));
            console.log('✅ Synced users from backend:', backendUsers.length);
            return true;
        } catch (error) {
            console.error('Error syncing from backend:', error);
            return false;
        }
    }
}

// Create global instance for both frontend and admin panel
window.userSync = new UserSyncService();
