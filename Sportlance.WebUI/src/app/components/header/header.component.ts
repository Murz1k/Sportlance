import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SportService} from "../../services/sport.service";
import {Sport} from "../../services/sport";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  country: string;

  countries: string[] = ['Russia', 'USA', 'France'];

  filteredCountriesSingle: any[];

  constructor(private router: Router,
              private sportService: SportService) {
  }

  async filterCountrySingle(event) {
    let query = event.query;
    // this.countryService.getCountries().then(countries => {
    const sports = await this.sportService.getSportsAsync();
    this.filteredCountriesSingle = this.filterCountry(query, sports);
    // });
  }

  filterCountry(query, countries: Sport[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  async loginAsync() {
    await this.router.navigate(['/login']);
  }

  async registerAsync() {
    await this.router.navigate(['/register']);
  }
}
