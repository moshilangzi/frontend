import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import '@arco-design/web-vue/dist/arco.css';
import 'tailwindcss/tailwind.css';
import ArcoVue from '@arco-design/web-vue';
import { useMessageStore, setupMessageStorePersistence } from './store/message';
import { useSessionStore, setupSessionStorePersistence } from './store/session';
import { useUserStore, setupUserStorePersistence } from './store/user';
import { useResourceStore, setupResourceStorePersistence } from './store/resource';
import { socketClient } from './ws/socket';
import { i18n } from './i18n';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ArcoVue);
app.use(i18n);
app.mount('#app');

// 启动消息持久化
const messageStore = useMessageStore();
setupMessageStorePersistence(messageStore);

// 启动会话持久化
const sessionStore = useSessionStore();
setupSessionStorePersistence(sessionStore);

// 启动用户持久化
const userStore = useUserStore();
setupUserStorePersistence(userStore);

// 启动资源持久化
const resourceStore = useResourceStore();
setupResourceStorePersistence(resourceStore);

// 启动 WebSocket 连接
socketClient.connect('ws://localhost:3001');
