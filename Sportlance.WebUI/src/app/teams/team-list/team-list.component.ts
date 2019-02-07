import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../core/paths';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TeamsService} from '../teams.service';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/internal/Subscription';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'sl-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams = [];
  isRendering = true;
  isLoading = false;
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
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Команды | Sportlance`);

    this.isAuthorized = this.authService.isAuthorized;
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
    this.isLoading = true;
    this.offset = this.count + this.offset;
    this.subscription = this.teamsService.get(<any>{
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
      response.items.map(i => <any>{
        id: i.id,
        city: i.city,
        country: i.country,
        title: i.title,
        subTitle: i.subTitle,
        photoUrl: i.photoUrl,
        about: this.cutAbout(i.about)
      }).forEach(item => this.teams.push(item));
      this.totalCount = response.totalCount;
      this.isLoading = false;
    });
  }

  updateData() {
    this.isRendering = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.offset = 0;
    }
    this.subscription = this.teamsService.get(<any>{
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
        this.teams = response.items.map(i => <any>{
          id: i.id,
          city: i.city,
          country: i.country,
          title: i.title,
          subTitle: i.subTitle,
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
    if (!about) {
      return '';
    }

    if (about.length <= 167) {
      return about;
    }
    return about.substring(0, 167) + '...';
  }

  public openProfile(teamId: number) {
    this.router.navigate([`${Paths.Teams}/${teamId}`]);
  }

  reset() {
    this.searchString = undefined;
    this.country = undefined;
    this.city = undefined;
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.minFeedbacksCount = undefined;
    this.maxFeedbacksCount = undefined;

    this.changeParams();
  }
}
