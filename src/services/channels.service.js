import firebase from "../firebase";

const db = firebase.ref("/channels");

class channelsDataService {
  getAll() {
    return db;
  }

  create(channels) {
    return db.push(channels);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new channelsDataService();
