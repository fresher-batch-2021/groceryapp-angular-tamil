import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../class-folder/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ThemeModule } from './theme/theme.module';
import { CouchDBInterceptor } from './couchdb-interceptor';
import { DatePipe } from '@angular/common';
import { UpdateProductComponent } from './update-product/update-product.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ImageGalleryComponent,
    UpdateProductComponent,
    

  ],
  imports: [
    BrowserModule,
    // AuthModule,
    // AdminModule,
    ThemeModule,
    ProductModule,
    UserModule,
    OrderModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    

    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 2000,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CouchDBInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
  ]
})
export class AppModule { }
