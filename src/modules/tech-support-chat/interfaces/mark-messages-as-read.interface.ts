export interface IMarkMessagesAsRead {
  // TODO: Зачем юзер?
  userId: string;
  supportRequestId: string;
  createdBefore: Date;
}
