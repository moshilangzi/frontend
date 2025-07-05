import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import MainView from './views/MainView.vue';
import SessionView from './views/SessionView.vue';
import SettingsView from './views/SettingsView.vue';
import ResourceView from './views/ResourceView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Main', component: MainView },
  { path: '/session', name: 'Session', component: SessionView },
  { path: '/settings', name: 'Settings', component: SettingsView },
  { path: '/resources', name: 'Resources', component: ResourceView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 