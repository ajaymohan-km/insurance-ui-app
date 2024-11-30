import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insurance-plans.component.html',
  styleUrls: ['./insurance-plans.component.scss']
})
export class InsurancePlansComponent implements OnInit {
  plans: any[] = [];
  loading = true;

  constructor() {}

  ngOnInit(): void {

  }


}