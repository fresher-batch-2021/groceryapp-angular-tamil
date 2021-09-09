import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent {

  @ViewChild('carousel')
  input!: ElementRef<HTMLInputElement>;

  constructor(){}

  ngAfterViewInit()
  {
    console.log(this.input.nativeElement);
    // setTimeout(() => {(this.input.nativeElement);}, 2000);
  }
}
