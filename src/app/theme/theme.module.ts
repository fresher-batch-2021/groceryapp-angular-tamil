import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ChartComponent } from '../chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [

    HeaderComponent,
    FooterComponent,
    ChartComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,    
    ChartsModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ChartComponent
  ]
})
export class ThemeModule { }
