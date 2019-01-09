import {Injectable, Injector} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmailIsConfirmedGuard implements CanActivate {
  service: AuthService;

  constructor(private router: Router, private injector: Injector) {
    this.service = this.injector.get(AuthService);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.service.isAuthorized && !this.service.getCurrent().isConfirmed) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
