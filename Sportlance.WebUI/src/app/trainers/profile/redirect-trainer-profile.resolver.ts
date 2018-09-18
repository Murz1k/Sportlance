import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Paths} from '../../core/paths';
import {TrainerProfileResponse} from '../../services/trainers/responses/trainer-profile-response';
import {TrainersService} from '../../services/trainers/trainers.service';

@Injectable()
export class RedirectTrainerProfileResolver implements Resolve<TrainerProfileResponse> {
  service: TrainersService;
  constructor(private router: Router, private injector: Injector) {
    this.service = this.injector.get(TrainersService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainerProfileResponse> {
    return this.service.getById(route.params['id'])
      .pipe(map((response: any) => {
      if (response.errorCode) {
        return this.router.navigate([Paths.Trainers]);
      }
      return response;
    }));
  }
}
