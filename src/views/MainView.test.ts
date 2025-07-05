import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MainView from './MainView.vue';
import { setActivePinia, createPinia } from 'pinia';
import { i18n } from '../i18n';

describe('MainView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders SessionView and LocalMedia (mock AvatarRenderer)', () => {
    const wrapper = mount(MainView, {
      global: {
        plugins: [i18n],
        stubs: {
          AvatarRenderer: { template: '<div class="mock-avatar">mock avatar</div>' },
        },
      },
    });
    expect(wrapper.findComponent({ name: 'SessionView' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'LocalMedia' }).exists()).toBe(true);
    expect(wrapper.find('.mock-avatar').exists()).toBe(true);
  });
}); 