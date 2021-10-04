import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;
  let activatedRouteSpy;
  beforeEach(async () => {
    activatedRouteSpy = {
      snapshot: {
        paramMap: convertToParamMap({
          fizz: 3,
          buzz: 4,
        })
      }
    };
    await TestBed.configureTestingModule({
      declarations: [TimerComponent],
      providers: [{
        provide: ActivatedRoute, useValue: activatedRouteSpy
      }]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(TimerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.ngOnInit();
    });
  });

  describe('calculateFizzBuzz', () => {
    beforeEach(() => {
      component.fizz = 3;
      component.buzz = 4;
    });
    it('should display fizzbuzz if fizz and buzz are multiples of time', () => {
      component.time = 12;
      expect(component.calculateFizzBuzz()).toEqual('FizzBuzz');
    });
    it('should display fizz if fizz is multiple of time', () => {
      component.time = 6;
      expect(component.calculateFizzBuzz()).toEqual('Fizz');
    });
    it('should display buzz if buzz is multiple of time', () => {
      component.time = 8;
      expect(component.calculateFizzBuzz()).toEqual('Buzz');
    });
  })

  describe('onStart', () => {
    it('should start timer if not counting', () => {  
      jasmine.clock().install();    
      component.isCounting = false;
      component.onStart();      
      jasmine.clock().tick(4000);

      expect(component.time).toEqual(4);
      expect(component.displayText).toEqual('');
      expect(component.isCounting).toEqual(true);

      jasmine.clock().uninstall();
    });
    it('should switch isCounting & reset text', () => {    
      component.isCounting = false;
      component.onStart();      

      expect(component.isCounting).toEqual(true);
      expect(component.displayText).toEqual('');
    });
  });

  describe('onStop', () => {
    it('should stop timer if counting', () => {   
      component.isCounting = true;
      component.time = 12;       
      spyOn(component, 'calculateFizzBuzz');
      component.onStop();     

      expect(component.calculateFizzBuzz).toHaveBeenCalled();
      expect(component.isCounting).toEqual(false);
    });

    it('should reset timer if already stopped', () => {   
      component.isCounting = false;
      component.onStop();     

      expect(component.displayText).toEqual('');
      expect(component.time).toEqual(0);
    });
  })
});
