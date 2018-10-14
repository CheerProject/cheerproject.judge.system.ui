import { CustomHerrorHandler } from './../../../../core/errors/error-handler';
import { MessageService } from './../../../../core/services/message.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordingService extends CustomHerrorHandler {
  constructor(messageService: MessageService) {
    super(messageService);
  }

  wait(delayInMs) {
    return new Promise(resolve => setTimeout(resolve, delayInMs));
  }

  startRecording(stream: MediaStream, lengthInMS) {
    const recorder = new MediaRecorder(stream);
    const data = [];

    recorder.ondataavailable = event => data.push(event.data);
    recorder.start();

    this.log(recorder.state + ' for ' + lengthInMS / 1000 + ' seconds...');

    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = event => reject(event.name);
    });

    const recorded = this.wait(lengthInMS).then(
      () => recorder.state === 'recording' && recorder.stop()
    );

    return Promise.all([stopped, recorded]).then(() => data);
  }

  stop(stream: MediaStream) {
    stream.getTracks().forEach(track => track.stop());
  }
}
