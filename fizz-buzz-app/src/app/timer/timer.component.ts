import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() fizz: any;
  @Input() buzz: any;
  time: number;
  displayText: String = '';
  setTimesButtonText: String = '< Set Times';
  isCounting: boolean;
  interval: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {   
    this.fizz = this.activatedRoute.snapshot.paramMap.get('fizz');
    this.buzz = this.activatedRoute.snapshot.paramMap.get('buzz');
    this.isCounting = false;
    this.resetTimer();
  }

  /**
   * Start the timer.
   */
  onStart() {
    if (!this.isCounting) {
      // Start timer
      this.isCounting = true;
      this.resetDisplayText(); // Clear text when timer is started up again
      this.interval = setInterval(() => {
        if (this.time < 35999) { // 9 hours, 59 mins, 59 seconds = 35999 seconds
          this.time++;
        } else {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  /**
   * Stop the timer or reset timer if already stopped.
   */
  onStop() {
    if (this.isCounting) {
      // Stop Timer
      this.isCounting = false;
      this.displayText = this.calculateFizzBuzz();
      clearInterval(this.interval);
    } else {
      // Already stopped - reset timer
      this.resetTimer();
      this.resetDisplayText();
    }
  }

  /**
   * Calculate the fizz and buzz values and display text accordingly.
   * If time is multiple of fizz and buzz then display FizzBuzz
   * If time is multipe of fizz then display Fizz
   * If time is multiple of buzz then display Buzz
   * example: time is 40 seconds, fizz is 2, buzz is 4 then display text would be FizzBuzz
   * @returns string - Text to be displayed.
   */
  calculateFizzBuzz() {
    const isFizz = this.time % this.fizz === 0;
    const isBuzz = this.time % this.buzz === 0;

    if (isFizz && isBuzz) {
      return 'FizzBuzz';
    } else if (isFizz) {
      return 'Fizz'
    } else if (isBuzz) {
      return 'Buzz';
    }
    return '';
  }

  /**
   * Reset display text.
   */
  resetDisplayText() {
    this.displayText = '';
  }

  /**
   * Reset timer to 0.
   */
  resetTimer() {
    this.time = 0;
  }
}
