import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products = [
    { 
      id: 1, 
      name: 'Téléphone Samsung A53', 
      quantity: 8, 
      price: 350, 
      image: 'assets/images/samsung-a53.png' 
    },
    { 
      id: 2, 
      name: 'Téléphone Samsung S21', 
      quantity: 10, 
      price: 900, 
      image: 'assets/images/samsung-s21.png' 
    },
    { 
      id: 3, 
      name: 'Téléviseur Samsung 32 pouces', 
      quantity: 5, 
      price: 250, 
      image: 'assets/images/samsung-tv-32.png' 
    },
    { 
      id: 4, 
      name: 'Tablette Samsung', 
      quantity: 15, 
      price: 400, 
      image: 'assets/images/samsung-tablet.png' 
    }
  ];

  constructor(private router: Router) {}

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/imagenotfound.png';
  }

  showDetails(product: any) {
    this.router.navigate(['/product', product.id], {
      state: { product }
    });
  }
}


