// importing observables and decorate
import { action, decorate, observable } from "mobx";
import { API_URL, getIdToken } from "../api/Services";

class Store {
  actionStatic = null;

  reactionStatic = null;

  action = null;

  reaction = null;

  subscribe = null;

  setAction = data => {
    this.action = data;
    this.actionStatic = data;
  };

  setReaction = data => {
    this.reaction = data;
    this.reactionStatic = data;
  };
}

// another way to decorate variables with observable
decorate(Store, {
  action: observable,
  reaction: observable,
  subscribe: observable,
  setAction: action,
  setReaction: action
});

// export class
export default new Store();
