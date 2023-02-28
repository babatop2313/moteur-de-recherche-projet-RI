import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor( private readonly authService : authService,
              private readonly router : Router){

  }
  form !:FormGroup

  ngOnInit(): void {

       this.form = new FormGroup({
         email: new FormControl('', Validators.required),
         password: new FormControl('', Validators.required),

       });
       
     }

     async login() : Promise<void>{
      
        (this.authService.login(this.form.value))
          .subscribe((data : any) =>{
            // console.log({aa: this.form.value});
              this.router.navigateByUrl('/')
          })
     }
 }
