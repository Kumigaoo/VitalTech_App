import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handleHttpError(error: any) {
    if (error.status === 401 || error.status === 403) {
      window.location.href = 'https://media.licdn.com/dms/image/v2/C5612AQHq_mq4mA74Mw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520192667866?e=2147483647&v=beta&t=Tp1x9qhXS-LDYiXTnbHmTbbrhHu2n9i2xht9yOXAOYQ';
    }
    return throwError(() => error);
  }
}
