import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlDecodeService {

  constructor() { }

  decode(html: string): string{
    const parser = new DOMParser();
    const decoded = parser.parseFromString(html, 'text/html').documentElement.textContent;
    return decoded || html
  }
}
