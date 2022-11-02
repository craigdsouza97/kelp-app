import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IDGenerationService {

  constructor() { }

  //Generate random uniqueID based on the number of parts provided
  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
