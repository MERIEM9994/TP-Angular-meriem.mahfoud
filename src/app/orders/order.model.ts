export enum OrderStatus {
  EnCours = 'en cours',
  Expediee = 'expédiée',
  Livree = 'livrée'
}

export interface Order {
  id: number;
  customerName: string;
  date: Date;
  status: OrderStatus;
  totalAmount: number;
}


