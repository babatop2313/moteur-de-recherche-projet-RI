import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { authService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor (private readonly authService :  authService){}
  connect = false
  form !:FormGroup
  msg : any
  default = "sante informatique"
  ngOnInit(): void {

       this.form = new FormGroup({
         prenom: new FormControl ('', [Validators.required]),
         nom: new FormControl('', Validators.required),
         email: new FormControl('', Validators.required),
         password: new FormControl('', Validators.required),
         interet: new FormControl(''),


       });
       
     }

     async register() : Promise<void> {
      // console.log({a : this.form.value});
      (await this.authService.register(this.form.value))
          .subscribe((data : any)=>{
            this.connect = true
            this.msg = "inscription réussi, merci de vous connecter"
            this.form.value.nom = ""
            this.form.value.prenom = ""
            this.form.value.email = ""
            this.form.value.password = ""
          })
     }
}
