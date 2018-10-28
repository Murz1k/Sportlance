import {Component} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../core/paths';
import {AccountService} from '../../services/account-service';
import {GetTrainersQuery} from '../../shared/trainers/get-trainers-query';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TeamsService} from '../teams.service';
import {TrainerInfo} from '../../trainers/trainer-list/trainer-info';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {

  trainers = [];
  isRendering = true;
  public isAuthorized = false;
  public Paths = Paths;

  public searchString: string;
  public country: string;
  public city: string;

  public minPrice?: number;
  public maxPrice?: number;

  public offset = 0;
  public count = 10;
  public totalCount = 100;

  public minFeedbacksCount?: number;
  public maxFeedbacksCount?: number;

  public subscription: Subscription;

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private teamsService: TeamsService) {
    this.titleService.setTitle(`Команды | Sportlance`);

    this.isAuthorized = this.accountService.isAuthorized;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchString = params['q'];
      this.country = params['country'];
      this.city = params['city'];
      this.minPrice = params['minPrice'];
      this.maxPrice = params['maxPrice'];
      this.minFeedbacksCount = params['minFeedbacksCount'];
      this.maxFeedbacksCount = params['maxFeedbacksCount'];

      this.updateData();
      //this.isRendering = false;
    });
  }

  public onScrollDown() {
    if (this.offset + this.count >= this.totalCount) {
      return;
    }
    this.offset = this.count + this.offset;
    this.subscription = this.teamsService.get(<GetTrainersQuery>{
      searchString: this.searchString,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      offset: this.offset,
      count: this.count,
      city: this.city,
      country: this.country,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount
    }).subscribe(response => {
      response.items.map(i => <TrainerInfo>{
        id: i.id,
        city: i.city,
        country: i.country,
        photoUrl: i.photoUrl,
        about: this.cutAbout(i.about)
      }).forEach(item => this.trainers.push(item));
      this.totalCount = response.totalCount;
    });
  }

  updateData() {
    this.isRendering = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.offset = 0;
    }
    this.subscription = this.teamsService.get(<GetTrainersQuery>{
      searchString: this.searchString,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      offset: this.offset,
      count: this.count,
      city: this.city,
      country: this.country,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount
    }).subscribe(response => {
      if (response.items) {
        this.trainers = response.items.map(i => <TrainerInfo>{
          id: i.id,
          city: i.city,
          country: i.country,
          title: i.title,
          photoUrl: i.photoUrl,
          about: this.cutAbout(i.about)
        });
        this.offset = response.offset;
        this.totalCount = response.totalCount;

        this.isRendering = false;
      }
    });
  }

  changeParams() {
    const checkNumber = (param) => isNullOrUndefined(param) || param === '' || param === 0 ? null : +param;
    const checkString = (param) => isNullOrUndefined(param) || param === '' ? null : '' + param;
    this.router.navigate([Paths.Teams], {
      queryParams: {
        q: checkString(this.searchString),
        country: checkString(this.country),
        city: checkString(this.city),
        minPrice: checkNumber(this.minPrice),
        maxPrice: checkNumber(this.maxPrice),
        minFeedbacksCount: checkNumber(this.minFeedbacksCount),
        maxFeedbacksCount: checkNumber(this.maxFeedbacksCount)
      }
    });
  }

  login() {
    this.router.navigate([Paths.Login]);
  }

  private cutAbout(about: string): string {
    if (about.length <= 167) {
      return about;
    }
    return about.substring(0, 167) + '...';
  }

  public async openProfileAsync(teamId: number) {
    await this.router.navigate([`${Paths.Teams}/${teamId}`]);
  }
}
