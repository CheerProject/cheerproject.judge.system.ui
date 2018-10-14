import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { StopWatchService } from './services/stopwatch.service';
import { RecordingService } from './services/recording.service';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.css']
})
export class DeductionsComponent implements OnInit, AfterViewInit {
  @ViewChild('video')
  public videoContainer: ElementRef;
  @ViewChild('recording')
  public videoRecordingContainer: ElementRef;
  @ViewChild('canvas')
  public canvasContainer: ElementRef;

  @ViewChild('downloadButton')
  public downloadButton: HTMLAnchorElement;

  public captures: Array<any>;
  public started: boolean;
  public time: number;
  public autoStart = false;
  private timer: any;

  video: any;
  recording: any;
  canvas: HTMLCanvasElement;

  videoStream: Promise<any>;

  public constructor(
    public stopwatchService: StopWatchService,
    public recordingService: RecordingService
  ) {
    this.time = 0;
    this.started = false;
    if (this.autoStart) {
      this.start();
    }
    this.captures = [];
  }

  public ngOnInit() {}

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.video = this.videoContainer.nativeElement;
      this.recording = this.videoRecordingContainer.nativeElement;
      this.canvas = this.canvasContainer.nativeElement;
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      });
    }
  }

  public capture() {
    const context = this.canvas
      .getContext('2d')
      .drawImage(this.video, 0, 0, 320, 240);
    const screenshot = this.canvas.toDataURL('image/png');
    this.captures.push(screenshot);
  }

  formatTime(timeMs: number) {
    return this.stopwatchService.format(timeMs);
  }
  getUpdate() {
    const self = this;

    return () => {
      self.time = this.stopwatchService.time();
    };
  }

  reset() {
    this.stopwatchService.reset();
    this.started = false;
    this.update();
  }

  start() {
    this.timer = setInterval(this.getUpdate(), 1);
    this.stopwatchService.start();
    const recordingTime = 3000;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          this.video.srcObject = stream;
          this.video.play();
          this.video.captureStream =
            this.video.captureStream || this.video.mozCaptureStream;
          return new Promise(resolve => (this.video.onplaying = resolve));
        })
        .then(() =>
          this.recordingService.startRecording(
            this.video.captureStream(), recordingTime
          )
        )
        .then(recordedChunks => {
          const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
          this.recording.src = URL.createObjectURL(recordedBlob);
          this.downloadButton.href = this.recording.src;
          this.downloadButton.download = 'recordedVideo.webm';
          console.log(this.downloadButton.href);
        });
    }
  }

  stop() {
    clearInterval(this.timer);
    this.stopwatchService.stop();
    this.video.srcObject.getTracks().forEach(track => track.stop());
  }

  toggle() {
    if (this.started) {
      this.stop();
    } else {
      this.start();
    }

    this.started = !this.started;
  }

  update() {
    this.time = this.stopwatchService.time();
  }

  onClick() {
    console.log(this.stopwatchService);
  }
}
