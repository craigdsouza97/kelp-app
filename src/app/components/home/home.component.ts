import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGITResponse } from '../../models/igit-response';
import { GitHubAPIService } from '../../services/git-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() isHistory: boolean = false;

  @Input() userResponse: IGITResponse | undefined;

  @Output() onHistoryClickEmitter = new EventEmitter<boolean>();

  isUserFound: boolean = true;

  constructor(private githubAPI: GitHubAPIService) {}

  ngOnInit(): void {}

  // Fetches UserResponse from EventEmiiters in History and Search components
  setGITUserResponse(userReponse: IGITResponse) {
    this.userResponse = userReponse;
  }

  // Resets userResponse so that when HistoryToggle is clicked, GITUserProfile is reset
  resetGITUser() {
    this.userResponse = undefined;
  }

  setIsHistory(isHistory: boolean) {
    this.isHistory = isHistory;
    this.onHistoryClickEmitter.emit(isHistory);
    this.isUserFound = true;
  }

  onUserFound(isUserFound: boolean) {
    this.isUserFound = isUserFound;
  }
}
