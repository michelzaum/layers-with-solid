import Installments from "./Installments";

export default class Transaction {
  installments: Installments[];

  constructor(readonly code: string, readonly amount: number, readonly numberInstallments: number, paymentMethod: string) {
    this.installments = []
  };
};