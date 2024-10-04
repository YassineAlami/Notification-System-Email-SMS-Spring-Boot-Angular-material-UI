import {DeliveryMethod} from "./DeliveryMethod";

export interface Delivery {
  id: number
  name: string
  state: string
  deliveryMethod: DeliveryMethod

  creationDate:Date;
  deliveryDate:Date;
  estimatedDeliveryDate:Date;
  notifications: Notification[]
}
