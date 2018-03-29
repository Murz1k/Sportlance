import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SportService} from "../../services/sport.service";
import {Sport} from "../../services/sport";
import {isNullOrUndefined} from "util";
import {Paths} from '../../paths';
import {UserService} from "../../services/user.service/user.service";
import {User} from "../../services/user.service/user";
import {AccountService} from "../../services/account-service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public isEmpty: false;

  sport: Sport;
  sports: Sport[];
  filteredCountriesSingle: Sport[];

  public currentUser: User;
  public isAuth = false;

  constructor(private router: Router,
              private sportService: SportService,
              private userService: UserService,
              private accountService: AccountService) {
  }

  ngOnInit(): Promise<void> {
    return this.updateUserAsync();
  }

  async filterCountrySingle(event) {
    let query = event.query;
    this.filteredCountriesSingle = this.filterCountry(query, this.sports);
  }

  public async updateUserAsync(): Promise<void> {
    this.sports = this.sportService.sports;
    if (this.accountService.isAuthorized) {
      await this.userService.initializeAsync();
      this.currentUser = this.userService.currentUser;
      this.isAuth = true;
    }
  }

  filterCountry(query, countries: Sport[]): Sport[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: Sport[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  async loginAsync() {
    await this.router.navigate([Paths.Login]);
  }

  async registerAsync() {
    await this.router.navigate([Paths.SignUp]);
  }

  async submitAsync() {
    if (!isNullOrUndefined(this.sport.id)) {
      await this.router.navigate([Paths.Trainers + '/' + this.sport.id]);
    }
  }
}
