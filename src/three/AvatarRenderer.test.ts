import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AvatarRenderer from './AvatarRenderer.vue';

// mock Three.js WebGLRenderer
vi.mock('three', () => {
  const actual = vi.importActual('three');
  return {
    ...actual,
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      setSize: vi.fn(),
      render: vi.fn(),
      domElement: document.createElement('canvas'),
      dispose: vi.fn(),
    })),
    Scene: vi.fn().mockImplementation(() => ({ add: vi.fn() })),
    PerspectiveCamera: vi.fn().mockImplementation(() => ({ position: { set: vi.fn() } })),
    DirectionalLight: vi.fn().mockImplementation(() => ({ position: { set: vi.fn() } })),
    AmbientLight: vi.fn().mockImplementation(() => ({})),
  };
});

// mock GLTFLoader
vi.mock('three/examples/jsm/loaders/GLTFLoader.js', () => {
  return {
    GLTFLoader: vi.fn().mockImplementation(() => ({
      load: vi.fn(),
    })),
  };
});

describe('AvatarRenderer', () => {
  it('mounts and renders container', () => {
    const wrapper = mount(AvatarRenderer);
    expect(wrapper.find('div.bg-black').exists()).toBe(true);
  });
}); 