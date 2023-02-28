import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { ILogin } from './ILogin';
// import * as moment from 'moment';
import { environment } from 'src/environments/environment.prod';
import { query } from '@angular/animations';



const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    }
  )
};
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  end ='api/recupinfos';
  url : any



  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl1}${this.end}`
   }

   async getArticle(Article : any): Promise<Observable<any>>{ 
    // const URI = `${this.url}register`;   
    return await this.http.post<any>(this.url, Article, httpOptions)
  }
}




