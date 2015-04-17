import { LOGIN_USER, LOGOUT_USER } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class LoginStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._message = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case LOGIN_USER:
        this._message = action.data;
        this.emitChange();
        break;

      case LOGOUT_USER:
        this._message = null;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get user() {
    return this._message;
  }

  isLoggedIn() {
    return !!this._message;
  }
}

export default new LoginStore();
