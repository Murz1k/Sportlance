import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  country: string;

  countries: string[] = ['Russia', 'USA', 'France'];

  filteredCountriesSingle: any[];

  constructor(private router: Router) {
  }

  filterCountrySingle(event) {
    let query = event.query;
    // this.countryService.getCountries().then(countries => {
    this.filteredCountriesSingle = this.filterCountry(query, this.countries);
    // });
  }

  filterCountry(query, countries: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
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
