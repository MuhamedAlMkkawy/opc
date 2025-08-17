import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', () => {
  const userData = ref(null);
  const userImage = ref(null);
  const userName = ref(null);
  const userToken = ref(null)

  const handleUserData = (newUser) => {
    userData.value = newUser;
    userImage.value = newUser.image;
    userName.value = newUser.name;
    userToken.value = newUser.token
  };

  return {
    userData,
    userImage,
    userName,
    handleUserData
  };
}, {
  persist: {
    storage: {
      getItem: (key) => {
        const cookie = useCookie(key, { maxAge: 86400 }); // 1 day in seconds
        return cookie.value ? JSON.parse(cookie.value) : null;
      },
      setItem: (key, value) => {
        const cookie = useCookie(key, { maxAge: 86400 });
        cookie.value = JSON.stringify(value);
      },
      removeItem: (key) => {
        const cookie = useCookie(key);
        cookie.value = null;
      }
    }
  }
});