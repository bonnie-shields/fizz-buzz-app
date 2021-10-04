import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FizzBuzzFormComponent } from './fizz-buzz-form.component';

describe('FizzBuzzFormComponent', () => {
  let component: FizzBuzzFormComponent;
  let fixture: ComponentFixture<FizzBuzzFormComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FizzBuzzFormComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FizzBuzzFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
      });
  });

  it('should set default values for fizz and buzz', () => {
    let fizz = component.fizzBuzzForm.controls['fizz'];
    let buzz = component.fizzBuzzForm.controls['buzz'];

    expect(fizz.value).toEqual(null);
    expect(buzz.value).toEqual(null);
  });

  it('should set values for fizz and buzz', () => {
    let fizz = component.fizzBuzzForm.controls['fizz'];
    let buzz = component.fizzBuzzForm.controls['buzz'];
    fizz.setValue(3);
    buzz.setValue(4);
    expect(fizz.value).toEqual(3);
    expect(buzz.value).toEqual(4);
  });
});
