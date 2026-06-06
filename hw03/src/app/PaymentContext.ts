import { PaymentProviderFactory } from "../core/PaymentProviderFactory";
import { PaymentProvider } from "../core/PaymentProvider";

export class PaymentContext {
  private provider: PaymentProvider;

  constructor(factory: PaymentProviderFactory) {
    this.provider = factory.createPaymentProvider();
  }

  processPayment(amount: number): void {
    const transactionId = Math.random().toString(36).substring(7);
    this.provider.authorize(amount);
    this.provider.capture(transactionId);
    this.provider.refund(transactionId);
  }
}
