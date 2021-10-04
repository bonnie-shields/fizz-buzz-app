import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FizzBuzzFormComponent } from './fizz-buzz-form/fizz-buzz-form.component';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  { path: 'timer/:fizz/:buzz', component: TimerComponent },
  { path: '', component: FizzBuzzFormComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
