import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-cards-packs',
  templateUrl: './cards-packs.component.html',
  styleUrls: ['./cards-packs.component.scss']
})
export class CardsPacksComponent implements OnInit{

  ngOnInit(): void {
    AOS.init();
  }

}
