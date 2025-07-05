<template>
  <div ref="container" class="w-full h-full bg-black"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = ref<HTMLElement | null>(null);
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let model: THREE.Object3D | null = null;
let animationId: number;

function animate() {
  animationId = requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.005;
  renderer.render(scene, camera);
}

onMounted(() => {
  if (!container.value) return;
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 3);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // 加载 glTF 模型（可替换为实际模型路径）
  const loader = new GLTFLoader();
  loader.load('/avatar_sample.glb', (gltf: GLTF) => {
    model = gltf.scene;
    scene.add(model);
  });

  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  renderer.dispose();
});
</script>

<style scoped>
.w-full { width: 100%; }
.h-full { height: 100%; }
.bg-black { background: #000; }
</style> 