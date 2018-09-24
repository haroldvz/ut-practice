import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAgePipe } from './pipes/calculate-age.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[GetAgePipe],
  declarations: [GetAgePipe]
})
export class PipesModule { 
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [],
    };
 }
}
