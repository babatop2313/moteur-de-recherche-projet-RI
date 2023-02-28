import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../auth/auth.service';
import {  ArticlesService } from './articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
  id : any
  username : any
  connect = false
  data : any
  search = false
  interet = false
  selectedInteret: {[key: string]: boolean} = {};
  user : any

  // To access the selected fruits
  
 Article = {
    query: "informatique santé"
    
  }
 valueSearch : any
  form !: FormGroup
  interets =["informatique", "santé","sport", "agriculture", "politique",  "economie", "international", "actualité"]

  constructor(private readonly authService : authService,
              private readonly articleService: ArticlesService,
              private readonly router : Router){}
  ngOnInit(): void {
  //  this.articles.query = "informatique santé"
    this.username = this.authService.getUsername()
   
    if(this.username !== 'null'){
      this.connect = true
      this.valueSearch = this.authService.getCenterInteret()
      if(this.valueSearch !== undefined)
       { this.Article.query =this.valueSearch
        this.getAllArticles(this.Article)}
    }
    if(this.connect){
      this.id = this.authService.getCurrentUser()
      // console.log({aa: this.id})
      this.getUser()
    }
    this.getAllArticles(this.Article)

    this.form =new FormGroup({
      query: new FormControl('', Validators.required),
    });

// this.getUser()
  }

  
  logout() : void{
  this.authService.logout()
  this.connect = false
 }
 async getAllArticles(query : any) : Promise<void>{
 console.log({cc: query});
  (await this.articleService.getArticle(query))
  .subscribe((data : any) =>{
    this.data = data
    if(!this.search)
    this.data = this.readArrayRandomly(this.data)
 
    // console.log({aa : this.data})

  })
 }

  readArrayRandomly<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
async recherche() :Promise<void>{
  this.search = true;
  this.getAllArticles(this.form.value)
}
vueInteret() : void{
  this.interet = !this.interet
}
async update() : Promise<void> {
  // console.log(this.selectedInteret);
  // console.log(Object.keys(this.selectedInteret).filter((k :any) => this.selectedInteret[k]));
 let data = Object.keys(this.selectedInteret).filter((k :any) => this.selectedInteret[k])
 let query = ""

 for(let i=0; i<data.length;  i++){
  query = query +  " " + data[i]
 }

 this.user.interet=query;

 (await this.authService.update(this.user, this.user._id))
 .subscribe((data : any) =>{
  this.router.navigate(['/']).then(() => {
    window.location.reload();
  });
 })

}

async getUser() : Promise<void>{
  (await (this.authService.getUser(this.id)))
   .subscribe((data : any) =>{
    this.user = data
    // console.log({ss: this.user.interet})
    if(this.user.interet !== undefined)
    this.getAllArticles(this.user.interet)
   })
}

}


// To access the selected fruits
//   data=[{
//     titre : "sonko Adji Sarr",
//     content :  "Sonko a raison, non c'est Adji qui a raison. Sonko a des peuves du complot. Adji a des vidéo qui euvent faire tomber sonko"
//   },
//   {
//     titre : "sonko Adji Sarr",
//     content :  "Sonko a raison, non c'est Adji qui a raison. Sonko a des peuves du complot. Adji a des vidéo qui euvent faire tomber sonko"
//   },
//   {
//     titre : "sonko Adji Sarr",
//     content :  "Sonko a raison, non c'est Adji qui a raison. Sonko a des peuves du complot. Adji a des vidéo qui euvent faire tomber sonko"
//   },
//   {
//     titre : "sonko Adji Sarr",
//     content :  "Sonko a raison, non c'est Adji qui a raison. Sonko a des peuves du complot. Adji a des vidéo qui euvent faire tomber sonko"
//   },
//   {
//     titre : "sonko Adji Sarr",
//     content :  "Sonko a raison, non c'est Adji qui a raison. Sonko a des peuves du complot. Adji a des vidéo qui euvent faire tomber sonko"
//   },
//   {
//     titre : "sonko Adji Sarr",
//     content :  "Sonko a raison, non c'est Adji qui a raison. Sonko a des peuves du complot. Adji a des vidéo qui euvent faire tomber sonko"
//   }
// ]
