import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountriesComponent } from './countries.component';
import { ModalComponent } from '@app/features/modal/modal.component';


@NgModule({
  declarations: [
    CountriesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CountriesComponent
  ]
})
export class CountriesModule { }
