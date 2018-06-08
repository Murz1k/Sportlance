import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SportService} from '../../services/sport.service';
import {Sport} from '../../services/sport';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../paths';
import {UserService} from '../../services/user.service/user.service';
import {User} from '../../services/user.service/user';
import {AccountService} from '../../services/account-service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public isEmpty: false;

  sport: Sport;
  sports: Sport[];
  filteredCountriesSingle: Sport[];

  public currentUser: User;
  public isAuthorized = false;
  public Paths = Paths;

  constructor(private router: Router,
              private sportService: SportService,
              private userService: UserService,
              private accountService: AccountService) {
    this.sports = this.sportService.sports;
    this.accountService.authStatusChanged.subscribe(async () => await this.updateUserAsync());
  }

  async ngOnInit() {
    return await this.updateUserAsync();
  }

  async filterCountrySingle(event) {
    const query = event.query;
    this.filteredCountriesSingle = this.filterCountry(query, this.sports);
  }

  public async updateUserAsync(): Promise<void> {
    if (this.accountService.isAuthorized) {
      this.currentUser = await this.userService.getCurrent();
      this.isAuthorized = true;
    } else {
      this.currentUser = null;
      this.isAuthorized = false;
    }
  }

  filterCountry(query, countries: Sport[]): Sport[] {
    const filtered: Sport[] = [];
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  login() {
    this.router.navigate([Paths.Login]);
  }

  async registerAsync() {
    await this.router.navigate([Paths.SignUp]);
  }

  async submitAsync() {
    if (!isNullOrUndefined(this.sport.id)) {
      await this.router.navigate([Paths.Trainers + '/' + this.sport.id]);
    }
  }

  navigateToAccount() {
    this.router.navigate([Paths.Account]);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate([Paths.Root]);
  }
}
