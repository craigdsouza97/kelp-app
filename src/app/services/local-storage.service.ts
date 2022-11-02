import { Injectable } from '@angular/core';
import { IUserHistory } from '../models/iuser-history';
import { IDGenerationService } from './idgeneration.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private idGeneration: IDGenerationService) { }


  // Fetch History from local service, if not present create new History
  saveHistory(search:string, date: Date, foundProfile: boolean, url: string) {
    let _id: string = this.idGeneration.getUniqueId(4);
    let newSearchHistory: IUserHistory = {_id, search, date, foundProfile, url};
    let history: Array<IUserHistory> = this.getHistoryFromLocalStorage();
    history.push(newSearchHistory);
    this.saveHistoryToLocalStorage(history);
  }

  // Fetch History from Local Storage
  getHistoryFromLocalStorage(): Array<IUserHistory> {
    return localStorage.getItem("history") === null ? [] : JSON.parse(localStorage.getItem("history")!);
  }

  // Save History to Local Storage
  saveHistoryToLocalStorage(history: Array<IUserHistory>) {
    localStorage.setItem("history", JSON.stringify(history));
  }
}
