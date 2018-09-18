import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HeadersConstants} from '../../core/constants';
import {isNullOrUndefined} from 'util';
import {UserService} from '../user.service/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.userService.getToken();
    if (isNullOrUndefined(token)) {
      return next.handle(req);
    }

    const headers = req.headers
      .append(HeadersConstants.Authorization, 'Bearer ' + token);
    const request = req.clone({headers: headers});
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const newJwt = event.headers.get(HeadersConstants.XNewAuthToken);
        if (!isNullOrUndefined(newJwt)) {
          this.userService.saveToken(newJwt);
        }
      }
    }));
  }
}
