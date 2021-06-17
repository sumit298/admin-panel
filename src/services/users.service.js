import firebase from "../firebase";
// import auth from "../firebase";
const db = firebase.ref("/users");
class usersDataService {
  getAll() {
    return db;
  }

  create(users) {
    return db.push(users);
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

export default new usersDataService();
