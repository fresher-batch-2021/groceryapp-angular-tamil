import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ImageGalleryComponent,
   
  ],
  imports: [
    BrowserModule,
    AuthModule,    
    AdminModule,
    ProductModule,
    UserModule,
    OrderModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
