import { defineStore } from 'pinia';
import { watch } from 'vue';

export interface UserInfo {
  id: string;
  nickname: string;
}

const STORAGE_KEY = 'openavatarchat_user';

function getDefaultUser(): UserInfo {
  return {
    id: '',
    nickname: '',
  };
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: (JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')) as UserInfo || getDefaultUser(),
    loggedIn: false,
  }),
  actions: {
    login(nickname: string) {
      this.user = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
        nickname,
      };
      this.loggedIn = true;
    },
    logout() {
      this.user = getDefaultUser();
      this.loggedIn = false;
    },
    setUser(user: UserInfo) {
      this.user = user;
      this.loggedIn = !!user.id;
    },
  },
});

export const setupUserStorePersistence = (store: ReturnType<typeof useUserStore>) => {
  watch(
    () => store.user,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
  );
}; 