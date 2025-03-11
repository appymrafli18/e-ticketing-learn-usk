export interface IPayment {
  bookingId: string;
  payment_method: string;
  jumlah_pembayaran?: number;
  status?: string;
}
