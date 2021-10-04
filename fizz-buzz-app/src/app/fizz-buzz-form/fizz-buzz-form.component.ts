import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fizz-buzz-form',
  templateUrl: './fizz-buzz-form.component.html',
  styleUrls: ['./fizz-buzz-form.component.scss']
})
export class FizzBuzzFormComponent implements OnInit {

  public fizzBuzzForm: FormGroup;
  goToTimerButtonText: String = 'Go to Timer >';

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.fizzBuzzForm = this.formBuilder.group({
      fizz: [null],
      buzz: [null]
    });
  }

  onSubmit() {
    const form = this.fizzBuzzForm.value;
    // TODO: Add validators to check fizz and buzz value. Add Jira ticket to be completed next sprint.
    if (form.fizz && form.buzz &&
      form.fizz >= 2 && form.fizz <= 10 &&
      form.buzz >= 2 && form.buzz <= 10) {
      this.router.navigate(['timer', form.fizz, form.buzz]);
    }
  }
}
