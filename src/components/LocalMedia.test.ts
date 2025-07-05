import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LocalMedia from './LocalMedia.vue';

// mock getUserMedia 和 MediaStream
beforeEach(() => {
  vi.stubGlobal('MediaStream', class {});
  vi.stubGlobal('navigator', {
    mediaDevices: {
      getUserMedia: vi.fn().mockResolvedValue(new MediaStream()),
    },
  });
});

describe('LocalMedia', () => {
  it('renders video and buttons', () => {
    const wrapper = mount(LocalMedia);
    expect(wrapper.find('video').exists()).toBe(true);
    expect(wrapper.findAll('button').length).toBeGreaterThanOrEqual(2);
  });

  it('calls getUserMedia on start', async () => {
    const wrapper = mount(LocalMedia);
    await wrapper.find('button').trigger('click');
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
  });
}); 