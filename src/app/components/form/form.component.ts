import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
  <form class="w-100 text-xs border-8 border-white rounded-lg p-6" [formGroup]="mortgage" (ngSubmit)="onSubmit()">
  <header><h1 class="text-lg font-medium mb-5">Mortgage calculator</h1></header>
  <div class="grid grid-cols-3">
    <fieldset>
      <legend>Purchase price: <span class="text-sm font-medium">\${{ numberWithCommas(mortgage.value.purchasePrize) }}</span></legend>
      <input class="w-40" type="range" step="50000" max="1000000" formControlName="purchasePrize">
    </fieldset>
    <fieldset>
      <legend>Down payment: <span class="text-sm font-medium">\${{ numberWithCommas(mortgage.value.downPayment) }}</span></legend>
      <input class="w-40" type="range" step="5000" max="600000" formControlName="downPayment">
    </fieldset>
    <fieldset>
      <legend>Repayment time: <span class="text-sm font-medium">{{ numberWithCommas(mortgage.value.repaymentTime) }} years</span></legend>
      <input class="w-40" type="range" max="30" formControlName="repaymentTime">
    </fieldset>
    <fieldset>
      <legend>Interest rate: <span class="text-sm font-medium">{{ numberWithCommas(mortgage.value.interestRate) }}%</span></legend>
      <input class="w-40" type="range" max="15" formControlName="interestRate">
    </fieldset>
    <fieldset>
      <legend>Loan amount:</legend>
      <div class="text-lg font-bold">
        $ {{ numberWithCommas(loanAmount) }}
      </div>
    </fieldset>
    <fieldset>
      <legend>Estimated pr. month:</legend>
      <div class="text-lg font-bold">
        $ {{ (monthlyPrice) }}
      </div>
    </fieldset>
  </div>
  <button class="px-7 py-4 bg-violet-500 text-xs text-white rounded-sm mt-14">Get a mortgage quote</button>
  </form>
  `
})

export class FormComponent {
  mortgage = new FormGroup({
    purchasePrize: new FormControl(0),
    downPayment:   new FormControl(0),
    repaymentTime: new FormControl(0),
    interestRate:  new FormControl(0),
  })

  purchasePrize: number = 0;
  downPayment:   number = 0; 
  repaymentTime: number = 0;
  interestRate:  number = 0;

  loanAmount:    number = 0;
  monthlyPrice:  number = 0;

  onSubmit() {
    this.purchasePrize = this.mortgage.value.purchasePrize;
    this.downPayment   = this.mortgage.value.downPayment;
    this.repaymentTime = this.mortgage.value.repaymentTime * 12;
    this.interestRate  = this.mortgage.value.interestRate * 0.01 / 12;

    this.loanAmount    = this.purchasePrize - this.downPayment;
    this.monthlyPrice = Math.floor((this.loanAmount * (this.interestRate * Math.pow((1 + this.interestRate), (this.repaymentTime))) 
                        / (Math.pow((1 + this.interestRate), (this.repaymentTime)) - 1)));
  }

  numberWithCommas(x: number | undefined | null) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}