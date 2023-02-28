import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { ILogin } from './ILogin';
// import * as moment from 'moment';
import { environment } from 'src/environments/environment.prod';
import { ILogin, User } from './interface';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};
class DecodedToken {
  exp!: number;
  username!: string;
}
@Injectable({
  providedIn: 'root'
})
export class authService {

  private decodedToken = new DecodedToken();
  end ='auth/';
  url : any
  url1 : any


  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}${this.end}`
    this.url1 = `${environment.apiUrl}user/`
    this.decodedToken = JSON.parse(localStorage.getItem('data') || '{}' ) || new DecodedToken();
   }

 /* public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    return this.http.post(URI, userData);
  }*/

  public login(userData: ILogin): Observable<any> {
    this.logout()
    const URI = `${this.url}login`;
      return this.http.post<ILogin>(URI, userData, httpOptions).pipe(map((token : ILogin) => {
     
        return this.saveToken(token);
    }));
  }

  async register(data : User): Promise<Observable<User>>{ 
    const URI = `${this.url}register`;   
    return await this.http.post<User>(URI, data, httpOptions)
  }

//sauvegarde des infos de connexion
  private saveToken(token: ILogin): any {
   
 
    localStorage.setItem('token', JSON.stringify(token.token));
    localStorage.setItem('data', JSON.stringify(token.user));

    return token;
  } 

  //déconnexion
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('data');

    this.decodedToken = new DecodedToken();
  }

  public getUsername(): string {
    const user= this.decodedToken = JSON.parse(localStorage.getItem('data')|| '{}');
    if(user.prenom === undefined && user.nom ===undefined)
    return 'null'
    const u = user.prenom + '  '+ user.nom;
    
    return u;
  }
  public getCenterInteret(): string {
    const user= this.decodedToken = JSON.parse(localStorage.getItem('data')|| '{}');
    if(user.interet === undefined)
    return 'null'
    const u = user.interet;
   
    return u;
  }

  async  getUser(id: string): Promise<Observable<object>> {
    const link = `${this.url1}${id}`;
    
    const data =  await this.http.get(link, httpOptions);
    return data
  }
  getCurrentUser(): any {
    const user= this.decodedToken = JSON.parse(localStorage.getItem('data')|| '{}'); 
   //console.log({v : user}) 
    return user._id;
  }
  getUserConnected(): any {
    const user= this.decodedToken = JSON.parse(localStorage.getItem('data')|| '{}'); 
    //console.log({v : user}) 
     return user
  }

  update( data: User, id: string,): Observable<User> {
    const link =  `${this.url1}${id}`;
    return this.http.patch<User>(link, data, httpOptions)
     
  }
}



// import { Injectable } from '@angular/core';

// @Injectable()
// export class MyserviceService {

//   constructor() { }

//   checkusernameandpassword(uname: string, pwd: string) {
//     if (uname === 'abdou' && pwd === 'N2S2023') {
//       localStorage.setItem('username', 'admin');
//       return true;
//     } else {
//       return false;
//     }
//   }
// }
