export interface WorkSession {
  id: number;
  taskId: number;
  startTime: Date;
  endTime: Date | undefined;
  userId: number;
  invoiceId: number | undefined;
  userPaymentId: number | undefined;
}
