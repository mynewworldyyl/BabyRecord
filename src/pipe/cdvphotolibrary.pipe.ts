import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'cdvphotolibrary'})
export class CDVPhotoLibraryPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string) {                           //this.sanitizer.bypassSecurityTrustUrl(url)
    let val = url.startsWith('cdvphotolibrary://') ? this.sanitizer.bypassSecurityTrustUrl(url) : url;
    return val;
  }
}
