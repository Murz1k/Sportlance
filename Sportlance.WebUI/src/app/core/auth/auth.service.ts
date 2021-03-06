import {EventEmitter, Injectable} from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {isNullOrUndefined} from 'util';
import {User} from './user';
import {LoginRequest} from './requests/login-request';
import {Observable} from 'rxjs';
import {LoginResponse} from './responses/login-response';
import {RegistrationRequest} from './requests/registration-request';
import {ResendEmailRequest} from './requests/resend-email-request';
import {ErrorResponse} from '../error-response';
import {UpdatePasswordRequest} from './requests/update-password-request';
import {UpdateAccountRequest} from './requests/update-account-request';
import {ConfirmRegistrationRequest} from './requests/confirm-registration-request';
import {CheckUserResponse} from './responses/check-user-response';
import {CheckUserRequest} from './requests/check-user-request';
import {map} from 'rxjs/operators';
import {Paths} from '../paths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  privateRefreshToken: string;
  userChanged: EventEmitter<User> = new EventEmitter<User>();

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
  }

  get accessToken(): string {
    return localStorage.getItem('access-token');
  }

  get isAuthorized(): boolean {
    return !!localStorage.getItem('access-token');
  }

  private get refreshToken(): string {
    return this.privateRefreshToken ? this.privateRefreshToken : localStorage.getItem('refresh-token');
  }

  // Проверяем наличие токена в сторадже или памяти
  hasRefreshToken(): boolean {
    return localStorage.getItem('refresh-token') !== null || !isNullOrUndefined(this.privateRefreshToken);
  }

  getCurrent(): User {
    const userOptions = this.getDecodedAccessToken(this.accessToken);
    let user = null;
    if (userOptions) {
      user = new User(
        userOptions.firstName,
        userOptions.secondName,
        userOptions.roles,
        userOptions.email,
        userOptions.isConfirmed,
        userOptions.photoUrl,
        userOptions.userId,
        userOptions.inviteLink
      );
    }
    return user;
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  updateAccessToken() {
    return this.http.put<any>(`/auth/token`, {refreshToken: this.refreshToken});
  }

  public register(request: RegistrationRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/register', request);
  }

  public reSendEmail(token: string) {
    return this.http.post('/auth/re-send', <ResendEmailRequest>{token: token});
  }

  changePassword(email: string) {
    return this.http.post('/auth/password', {email: email});
  }

  public updatePassword(oldPassword: string,
                        password: string,
                        confirmPassword: string): Observable<LoginResponse | ErrorResponse | any> {
    return this.http.put<ErrorResponse>('/auth/password', <UpdatePasswordRequest>{
      oldPassword: oldPassword,
      newPassword: password,
      confirmPassword: confirmPassword
    });
  }

  public updateAccount(firstName: string, secondName: string, email: string): Observable<LoginResponse> {
    return this.http.put<LoginResponse>('/auth', <UpdateAccountRequest>{
      firstName: firstName,
      secondName: secondName,
      email: email
    }).pipe(map((response) => {
      if (!response.error) {
        this.saveTokens(response);
      }
      return response;
    }));
  }

  public confirmEmail(request: ConfirmRegistrationRequest): Observable<LoginResponse> {
    return this.http.put<LoginResponse>('/auth/confirm', request)
      .pipe(map((response) => {
        if (!response.error) {
          this.saveTokens(response);
        }
        this.router.navigate([Paths.Root]);
        return response;
      }));
  }

  public saveTokens(response: LoginResponse, isRememberMe = false) {
    localStorage.setItem('access-token', response.accessToken);
    if (isRememberMe) {
      localStorage.setItem('refresh-token', response.refreshToken);
    } else {
      this.privateRefreshToken = response.refreshToken;
    }
    this.userChanged.emit(this.getCurrent());
  }

  uploadPhoto(photo: Blob): Observable<any> {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.put(`/users/photo`, data);
  }

  getUserByInviteLink(inviteLink: string): Observable<ErrorResponse | any> {
    return this.http.post(`/users/invite`, {inviteLink: inviteLink});
  }

  public checkUser(email: string): Observable<CheckUserResponse> {
    return this.http.post<CheckUserResponse>('/auth/check', <CheckUserRequest>{email: email});
  }

  public login(request: LoginRequest, isRememberMe = false): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth', request)
      .pipe(map((response) => {
        if (!response.error) {

          this.saveTokens(response, isRememberMe);

          const user = this.getCurrent();
          if (!user.isConfirmed) {
            this.router.navigate(['email-verify']);
            return;
          }

          const url = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl');
          if (url) {
            // Получаем путь
            const root = url.split('?')[0];

            if (!url.split('?')[1]) {
              this.router.navigate([root]);
            }

            const params = {};
            // Получаем строку с параметрами
            url.split('?')[1]
            // Преобразуем строку в массив из строк с параметрами
              .split('&')
              // Берем ключи и значения и заполняем пустой объект
              .map(elem => {
                params[elem.split('=')[0]] = elem.split('=')[1];
              });

            this.router.navigate([root], {queryParams: params});
          } else {
            this.router.navigate(['']);
          }
        }
        return response;
      }));
  }

  logout(redirectUrl = '') {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    this.privateRefreshToken = undefined;
    this.userChanged.emit();
    if (redirectUrl) {
      this.router.navigate(['/', 'login'], {queryParams: {redirectUrl: redirectUrl}});
    } else {
      this.router.navigate(['/', 'login']);
    }
  }
}
