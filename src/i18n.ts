import { createI18n } from 'vue-i18n';

const messages = {
  zh: {
    welcome: '欢迎使用 OpenAvatarChat 数字人系统！',
    user_settings: '用户设置',
    login: '登录',
    logout: '退出登录',
    current_user: '当前用户',
    resource_manage: '资源管理',
    send: '发送',
    image: '图片',
    audio: '语音',
    session_list: '会话列表',
    new_session: '新建',
    delete: '删除',
    main: '主界面',
    session: '会话',
    settings: '设置',
    resources: '资源',
  },
  en: {
    welcome: 'Welcome to OpenAvatarChat Digital Human System!',
    user_settings: 'User Settings',
    login: 'Login',
    logout: 'Logout',
    current_user: 'Current User',
    resource_manage: 'Resource Management',
    send: 'Send',
    image: 'Image',
    audio: 'Audio',
    session_list: 'Session List',
    new_session: 'New',
    delete: 'Delete',
    main: 'Main',
    session: 'Session',
    settings: 'Settings',
    resources: 'Resources',
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
}); 