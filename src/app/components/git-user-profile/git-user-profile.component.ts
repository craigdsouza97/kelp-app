import { Component, Input, OnInit } from '@angular/core';
import { IGITResponse } from '../../models/igit-response';

@Component({
  selector: 'app-git-user-profile',
  templateUrl: './git-user-profile.component.html',
  styleUrls: ['./git-user-profile.component.css'],
})
export class GitUserProfileComponent implements OnInit {
  @Input() user: IGITResponse | undefined;

  constructor() {}

  ngOnInit(): void {}
}
