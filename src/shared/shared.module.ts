import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from "./components/loading/spinner/spinner.component";

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SpinnerComponent,
  ]
})
export class SharedModule { }
