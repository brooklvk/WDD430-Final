import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {

  constructor() { }

  getNativeWindow(): Window | null {
    return typeof window !== 'undefined' ? window : null;
  }
}
