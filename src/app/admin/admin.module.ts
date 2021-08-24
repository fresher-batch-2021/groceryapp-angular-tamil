import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { PlaceOrdersComponent } from '../place-orders/place-orders.component';
import { RouterModule } from '@angular/router';



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
    

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
