import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-jhp-language-switcher',
  templateUrl: './jhp-language-switcher.component.html',
  styleUrls: ['./jhp-language-switcher.component.scss'],
})
export class JhpLanguageSwitcherComponent {
  availableLanguages: string[] = this.translate.langs;
  currLang: string = this.translate.currentLang;
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.currLang = this.translate.currentLang;
  }

  onLangClick(event: any) {
    const langIdx = this.availableLanguages.findIndex(
      (l) => l == this.currLang
    );
    const nextLangIdx =
      langIdx == this.availableLanguages.length - 1 ? 0 : langIdx + 1;
    const nextLang = this.availableLanguages[nextLangIdx];

    this.translate.use(nextLang);
    this.currLang = this.translate.currentLang;
    console.warn('lang switched to ', this.currLang);
  }
}
