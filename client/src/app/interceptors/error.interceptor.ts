import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavigationBehaviorOptions, NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                let errorMessage: string = '';
                const errors: string[] = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    errors.push(...error.error.errors[key]);
                  }
                }

                errors.forEach((error: string) => {
                  errorMessage += error + '<br/>'
                });

                console.log(errorMessage);
                this.toastr.error(errorMessage, 'Error', { enableHtml: true });
              }
              else {
                this.toastr.error(error.error, error.statusText);
              }
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } }
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            case 401:
              this.toastr.error(error.error, error.statusText);
              break;
            case 404:
              console.log('in 404');
              this.router.navigateByUrl('/not-found');
              break;
            default:
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
