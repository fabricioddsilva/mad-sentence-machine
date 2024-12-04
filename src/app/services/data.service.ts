import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { RandomStory } from '../models/randomStory.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:8080/api/stories'

  constructor(private http: HttpClient) { }

  insertStory(data: Story){
    this.http.post(this.apiUrl, data)
      .subscribe(res => {
        console.log(res)
      },
    error => {
      if(error.status == 400){
        console.error(error);
      }
    })
  }

  updateRate(rate: string, id: string){
    this.http.patch(this.apiUrl + '/' + id, rate)
      .subscribe(res => {
        console.log(res)
      })
  }

  getStory(): Observable<RandomStory>{
    return this.http.get<RandomStory>(this.apiUrl)
  }
}
