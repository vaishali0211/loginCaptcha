import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaptchaServiceService {
  constructor(private http: HttpClient) {}

  // getCaptcha() {
  //   return this.http.get('/api/captcha');
  // }

  // validateCaptcha(captchaId: string, captchaText: string) {
  //   return this.http.post('/api/validate-captcha', { captchaId, captchaText });
  // }

  generateCaptcha(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
