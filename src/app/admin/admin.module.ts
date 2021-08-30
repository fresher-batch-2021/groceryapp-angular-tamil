import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminListComponent,
    SideNavBarComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule
    

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
