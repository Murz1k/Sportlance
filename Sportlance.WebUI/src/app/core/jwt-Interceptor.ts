import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler, HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse, HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from './auth/auth.service';
import {isNullOrUndefined} from "util";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent |
      HttpHeaderResponse |
      HttpProgressEvent |
      HttpResponse<any> |
      HttpUserEvent<any> |
      any> {
    return next.handle(this.addAccessTokenToRequest(request, this.authService.accessToken))
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {

          // Если Refresh токена нет
          if (!this.authService.hasRefreshToken()) {
            this.authService.logout();
            return throwError(err);
            // Если Refresh токен есть
          } else {
            switch ((<HttpErrorResponse>err).status) {
              // Если токен протух
              case 401:
                return this.handle401Error(request, next);
              case 400:
                this.authService.logout();
                return throwError(err);
              case 403:
                return throwError(err);
              default:
                return throwError(err);
            }
          }
        } else {
          return throwError(err);
        }
      }));
  }

  private addAccessTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!isNullOrUndefined(token) && token !== 'undefined') {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return request;
  }

  private updateAccessTokenIfNeed(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.updateAccessToken()
      .pipe(
        switchMap((response) => {
          if (!response.error) {
            this.tokenSubject.next(response.accessToken);
            this.authService.login(response);
            return next.handle(this.addAccessTokenToRequest(request, response.accessToken));
          }
          // Если токена не дали
          this.authService.logout();
          return response;
        }),
        // Если сервис авторизации кидает ошибку или повторный запрос падает
        catchError((error) => {
          this.authService.logout();
          return throwError(error);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.updateAccessTokenIfNeed(request, next);
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addAccessTokenToRequest(request, token));
          }),
          // Если сервис авторизации кидает ошибку или повторный запрос падает
          catchError((error) => {
            this.authService.logout();
            return throwError(error);
          }));
    }
  }
}


/*
*
* import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent
} from '@angular/common/http';

import {AuthService} from './auth.service';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/internal/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent |
      HttpHeaderResponse |
      HttpProgressEvent |
      HttpResponse<any> |
      HttpUserEvent<any> |
      any> {

    return next.handle(this.addAccessTokenToRequest(request,))
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {

          // Если Refresh токена нет
          if (!this.authService.hasRefreshToken()) {
            return this.logoutAndThrowError(err);
          }
          // Если Refresh токен есть
          else {
            switch ((<HttpErrorResponse>err).status) {
              // Если токен протух
              case 401:
                return this.handle401Error(request, next);
              case 400:
                return this.logoutAndThrowError(err);
              case 403:
                return throwError(err);
              default:
                return throwError(err);
            }
          }
        } else {
          return throwError(err);
        }
      }));
  }

  private addAccessTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    return this.refreshToken().pipe(
      switchMap(() => {
        request = this.addAccessTokenToRequest(request);
        return next.handle(request);
      }),
      catchError((error) => this.logoutAndThrowError(error))
    );
  }

  private refreshToken() {
    if (this.isRefreshingToken) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.isRefreshingToken = true;

      return this.authService.refreshToken()
        .pipe(tap((data) => {
            // Если токена не дали или ошибка
            if (!data || data.error) {
              return this.logoutAndThrowError(data);
            }

            this.authService.login(data);

            this.isRefreshingToken = false;
            this.tokenRefreshedSource.next();

            return data;
          }),
          catchError((error) => {
            return this.logoutAndThrowError(error);
          })
        );
    }
  }

  logoutAndThrowError(error): Observable<never> {
    this.tokenRefreshedSource.unsubscribe();
    this.isRefreshingToken = false;
    this.authService.logout();
    return throwError(error);
  }
}

* */
