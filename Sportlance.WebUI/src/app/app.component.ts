import { isPlatformBrowser , DOCUMENT} from '@angular/common';
import { environment } from '../environments/environment';
import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';

@Component({
  selector: 'sl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
 constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any) {}


  ngOnInit() {
    if (environment.production) {
      console.log('%c Псс не хочешь немного поработать? Приходи к нам - frontend@sportlance.com', 'background: #008329; color: #fff');
    }
  
    if (!isPlatformBrowser(this.platformId)) {
        let bases = this.document.getElementsByTagName('base');

        if (bases.length > 0) {
            bases[0].setAttribute('href', environment.baseHref);
        }
    }
}
}
