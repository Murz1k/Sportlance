import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HeadersConstants} from '../../core/constants';
import {isNullOrUndefined} from 'util';
import {UserService} from '../user.service/user.service';
import {environment} from '../../../environments/environment';
import {ErrorCode} from '../../core/error-code';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request;
    const url = environment.baseUrl;
    //req = req.clone({url: `/api${req.url}`});
    req = req.clone({url: `${url}${req.url}`});

    const token = this.userService.getToken();
    if (isNullOrUndefined(token)) {
      request = req;
    } else {
      const headers = req.headers
        .append(HeadersConstants.Authorization, 'Bearer ' + token);
      request = req.clone({headers: headers});
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error && event.body.error.code === ErrorCode.AuthenticationError) {
          this.userService.deleteCurrentUser();
          return;
        }
        const newJwt = event.headers.get(HeadersConstants.XNewAuthToken);
        if (!isNullOrUndefined(newJwt)) {
          this.userService.saveToken(newJwt);
        }
      }
    }));
  }
}
