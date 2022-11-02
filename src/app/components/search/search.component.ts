import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IGITResponse } from '../../models/igit-response';
import { GitHubAPIService } from '../../services/git-api.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private githubAPI: GitHubAPIService,
    private localStorage: LocalStorageService
  ) {
    this.user = undefined;
  }

  username: string = '';

  previousUserName: string = '';

  user: IGITResponse | undefined;

  // Emmitter use by GITUserProfile component
  @Output() onSearch = new EventEmitter<IGITResponse>();

  @Output() onUserFound = new EventEmitter<boolean>(true);

  ngOnInit(): void {
    this.user = undefined;
  }

  // Calls the search API in GitAPIService
  OnSearch() {
    if (this.username != '')
      //&& this.username !== this.previousUserName) disabling this check so that we can add multiple proper profiles in history without having to search for them
      this.githubAPI.getUserDetails(this.username).subscribe(
        (response) => {
          this.user = response as IGITResponse;
          this.githubAPI.getRepos(this.user.repos_url).subscribe(
            (repoResponse) => {
              this.user!.repos = repoResponse;
            },
            (error) => {
              this.user!.repos = [];
            }
          );
          this.onSearch.emit(this.user);
          //if data was fetched successfully then we save it as a true in local storage so that we can show successful searches to the user in history
          this.localStorage.saveHistory(
            this.username,
            new Date(),
            true,
            this.user.url
          );
          this.previousUserName = this.username;
          this.onUserFound.emit(true);
        },
        (error) => {
          this.onSearch.emit(undefined);
          this.onUserFound.emit(false);
          this.localStorage.saveHistory(this.username, new Date(), false, '');
        }
      );
  }

  OnClear() {
    this.username = '';
  }
}
