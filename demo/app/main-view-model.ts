import { Observable } from 'tns-core-modules/data/observable';
import { Localytics } from 'nativescript-localytics';

export class HelloWorldModel extends Observable {
  public message: string;
  private localytics: Localytics;

  constructor() {
    super();

    this.localytics = new Localytics();
    this.message = this.localytics.message;
  }
}
