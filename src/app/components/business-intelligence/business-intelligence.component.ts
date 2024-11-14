import { Component } from '@angular/core';
import { Kpi1Component } from '../KPIS/kpi1/kpi1.component';
import { Kpi2Component } from '../KPIS/kpi2/kpi2.component';
import { Kpi3Component } from '../KPIS/kpi3/kpi3.component';
import { Kpi4Component } from '../KPIS/kpi4/kpi4.component';
import { Kpi5Component } from '../KPIS/kpi5/kpi5.component';

@Component({
  selector: 'app-business-intelligence',
  standalone: true,
  imports: [Kpi1Component,Kpi2Component,Kpi3Component,Kpi4Component,Kpi5Component],
  templateUrl: './business-intelligence.component.html',
  styleUrl: './business-intelligence.component.css'
})
export class BusinessIntelligenceComponent {

}
