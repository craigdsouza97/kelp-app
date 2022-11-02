import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'kelp-app';

  isHistory = false;

  @ViewChild(HomeComponent) home:HomeComponent | undefined;

  toggleHistory() {
    this.isHistory = !this.isHistory;
    this.home?.resetGITUser();
  }

  toggleHistoryWithValue(history: boolean) {
    this.isHistory = history;
  }
}
