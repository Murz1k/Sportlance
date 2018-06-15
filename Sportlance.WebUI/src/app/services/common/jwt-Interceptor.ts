import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HeadersConstants} from '../../core/constants';
import {isNullOrUndefined} from 'util';
import {UserInfoStorage} from '../../core/user-info-storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userContext: UserInfoStorage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = this.userContext.userInfo;
    if (isNullOrUndefined(user) || isNullOrUndefined(user.token)) {
      return next.handle(req);
    }

    const headers = req.headers
      .append(HeadersConstants.Authorization, 'Bearer ' + user.token);
    const request = req.clone({headers: headers});
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const newJwt = event.headers.get(HeadersConstants.XNewAuthToken);
        if (!isNullOrUndefined(newJwt)) {
          user.token = newJwt;
          user.roles = event.headers.get(HeadersConstants.XNewRoles).split(',');
          this.userContext.saveCurrentUser(user);
        }
      }
    }));
  }
}
