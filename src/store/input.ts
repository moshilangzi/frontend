import { defineStore } from 'pinia';

export const useInputStore = defineStore('input', {
  state: () => ({
    inputText: '',
    isRecording: false,
  }),
  actions: {
    setInputText(text: string) {
      this.inputText = text;
    },
    setRecording(val: boolean) {
      this.isRecording = val;
    },
    clearInput() {
      this.inputText = '';
    },
  },
}); 