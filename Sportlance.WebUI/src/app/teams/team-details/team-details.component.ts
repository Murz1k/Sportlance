import {Component, OnInit} from '@angular/core';
import {TeamProfileResponse} from '../../shared/teams/responses/team-profile-response';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, Title} from '@angular/platform-browser';

@Component({
  selector: 'sl-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  public profile: TeamProfileResponse;
  public isShowAbout = false;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private titleService: Title) {
  }

  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'];

    this.titleService.setTitle(`${this.profile.title} | Sportlance`);

    this.buildMaps(55.751574, 37.573856);
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
  }

  private buildMaps(longitude: number, latitude: number) {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(function () {
      const myMap = new ymaps.Map('map', {
          center: [longitude, latitude],
          zoom: 16,
          // Также доступны наборы 'default' и 'largeMapDefaultSet'
          // Элементы управления в наборах подобраны оптимальным образом
          // для карт маленького, среднего и крупного размеров.
          controls: []
        },
        {
          suppressMapOpenBlock: true
        });

      myMap.geoObjects.add(new ymaps.Placemark([longitude, latitude], {
        balloonContent: 'цвет <strong>красный</strong>'
      }, {
        preset: 'islands#redSportIcon'
      }))
    });
  }
}
