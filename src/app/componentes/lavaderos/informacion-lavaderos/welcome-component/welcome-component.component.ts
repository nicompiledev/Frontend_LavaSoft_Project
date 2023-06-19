import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome-component.component.html',
  styleUrls: ['./welcome-component.component.scss']
})
export class WelcomeComponentComponent implements OnInit{

  ngOnInit(): void {
    AOS.init();
  }

}
