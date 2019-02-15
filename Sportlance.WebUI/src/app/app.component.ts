import {Component, OnInit} from '@angular/core';
// import {environment} from 'environments/environment';

@Component({
  selector: 'sl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    // if (environment.production) {
    //   console.log('%c Псс не хочешь немного поработать? Приходи к нам - frontend@sportlance.com', 'background: #008329; color: #fff');
    // }
  }
}
