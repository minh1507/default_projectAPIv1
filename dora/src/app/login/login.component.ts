import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password"
  eye: string = "pi pi-eye-slash"

  constructor() { }

  ngOnInit(): void {
  }

  actionEye = () => {
    if(this.type === "password"){
      this.type = "text"
      this.eye = "pi pi-eye"
    }else{
      this.type = "password"
      this.eye = "pi pi-eye-slash"
    }
  }
}
