import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IGITResponse } from '../../models/igit-response';
import { IUserHistory } from '../../models/iuser-history';
import { GitHubAPIService } from '../../services/git-api.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  @Output() onHistoryClick = new EventEmitter<IGITResponse>();

  @Output() onProfileLinkClick = new EventEmitter<boolean>();

  displayedColumns: string[] = [
    'select',
    'foundProfile',
    'search',
    'date',
    'url',
  ];
  data: IUserHistory[];
  dataSource: MatTableDataSource<IUserHistory>;
  selection: SelectionModel<IUserHistory>;

  constructor(
    private githubAPI: GitHubAPIService,
    private localStorage: LocalStorageService
  ) {
    this.data = this.localStorage.getHistoryFromLocalStorage();
    this.sortData();
    this.dataSource = new MatTableDataSource<IUserHistory>(this.data);
    this.selection = new SelectionModel<IUserHistory>(true, []);
  }

  ngOnInit(): void {}

  sortData() {
    return this.data.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
  // Checks whether all rows are selected or not
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows in History for deletion
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  // Deletes Selected rows from History data and saves it to local storage
  delete() {
    this.data = this.data.filter((x) =>
      this.selection.selected.every((y) => y._id !== x._id)
    );
    this.dataSource = new MatTableDataSource<IUserHistory>(this.data);
    this.localStorage.saveHistoryToLocalStorage(this.data);

    if (this.data.length === 0) {
      this.onProfileLinkClick.emit(false);
    }
  }

  openSelectedUser(search: string) {
    this.githubAPI.getUserDetails(search).subscribe(
      (response) => {
        let user = response as IGITResponse;
        this.githubAPI.getRepos(user.repos_url).subscribe(
          (repoResponse) => {
            user!.repos = repoResponse;
          },
          (error) => {
            user!.repos = [];
          }
        );
        this.onHistoryClick.emit(user);
        this.onProfileLinkClick.emit(false);
      },
      (error) => {
        this.onHistoryClick.emit(undefined);
      }
    );
  }
}
