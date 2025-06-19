import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  mode: 'card' | 'cash' | null = 'card';

  paymentDone = false;

  selectMode(mode: 'card' | 'cash') {
    this.mode = mode;
    this.paymentDone = false;
  }

  submitCard() {
    // On peut imaginer envoyer au backend ici
    this.paymentDone = true;
  }

  submitCash() {
    this.paymentDone = true;
  }
}

