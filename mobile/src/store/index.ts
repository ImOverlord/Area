// importing observables and decorate
import { action, decorate, observable } from "mobx";

class Store {
  text = "";

  updateText = (text: string) => {
    this.text = text;
  };
}

decorate(Store, {
  text: observable,
  updateText: action
});

export default new Store();
