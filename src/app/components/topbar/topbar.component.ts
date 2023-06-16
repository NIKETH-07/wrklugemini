import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  activeLink!: string;

  highlightLink(link: string) {
    this.activeLink = link;
  }

}
