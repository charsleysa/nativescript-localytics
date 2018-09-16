import { Observable } from 'tns-core-modules/data/observable';
import { Localytics } from 'nativescript-localytics';

export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();

    console.log(Localytics);
    this.message = 'no demo available';
  }
}
