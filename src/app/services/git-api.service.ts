import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GitHubAPIService {

  constructor(private http: HttpClient) { }

  //Fetch User details for GitHub API
  getUserDetails(userName: string) {
    console.log(userName);
    return this.http.get(`https://api.github.com/users/${userName}`);
  }

  //Fetch User Repo details for GitHub API
  getRepos(repoUrl: string) {
    return this.http.get(repoUrl);
  }
}
