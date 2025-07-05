export class WebRTCLocalStream {
  private stream: MediaStream | null = null;

  async start(audio: boolean = true, video: boolean = true): Promise<MediaStream> {
    if (this.stream) return this.stream;
    this.stream = await navigator.mediaDevices.getUserMedia({ audio, video });
    return this.stream;
  }

  getStream(): MediaStream | null {
    return this.stream;
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
}

export const localStream = new WebRTCLocalStream(); 