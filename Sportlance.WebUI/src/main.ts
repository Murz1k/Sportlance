import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import * as moment from 'moment';

moment.locale('ru');

if (environment.production) {
  enableProdMode();
  enableYandexMetrika();
}

enableYandexMaps();

platformBrowserDynamic().bootstrapModule(AppModule);

function enableYandexMaps() {
  document.write(
    `
  <!-- Yandex Maps -->
  <script src="https://api-maps.yandex.ru/2.1/?apikey=de4ba415-f957-4ec5-8c59-fe27e4060a48&lang=ru_RU" async
  type="text/javascript">
    </script>
    `
  );
}

function enableYandexMetrika() {
  document.write(
    `
      <!-- Yandex.Metrika counter -->
  <script type="text/javascript" >
    (function (d, w, c) {
      (w[c] = w[c] || []).push(function() {
        try {
          w.yaCounter50024935 = new Ya.Metrika2({
            id:50024935,
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        } catch(e) { }
      });

      var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://mc.yandex.ru/metrika/tag.js";

      if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
      } else { f(); }
    })(document, window, "yandex_metrika_callbacks2");
  </script>
  <noscript><div><img src="https://mc.yandex.ru/watch/50024935" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
  <!-- /Yandex.Metrika counter -->
    `
  );
}
