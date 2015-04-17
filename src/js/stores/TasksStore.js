import { TASKS_LOADED } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class TasksStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._message = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case TASKS_LOADED:
        this._message = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get tasks() {
    return this._message;
  }
}

export default new TasksStore();
