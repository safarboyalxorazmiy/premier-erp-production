import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ProductionService } from '../../../services/production.service'

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  constructor(
    public api: ProductionService, 
    public renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    
  }

  async ngOnInit(): Promise<void> {
    
  }
}