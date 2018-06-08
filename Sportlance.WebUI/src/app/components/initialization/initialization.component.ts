import {Component, OnInit} from '@angular/core';
import {InitializationService} from '../../services/initialization/initialization.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-initialization',
  templateUrl: './initialization.component.html',
  styleUrls: ['./initialization.component.scss']
})
export class InitializationComponent implements OnInit {

  private returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private initializationService: InitializationService) {
  }

  async ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.returnUrl = params.returnUrl || '/';
      });

    await this.initializationService.initializeAsync();
    await this.router.navigateByUrl(this.returnUrl);
  }
}
