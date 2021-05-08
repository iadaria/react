import firebase from 'firebase/app';
import { $firebaseUsers, addUserFx, updateUsers } from '.';

const usersRef = firebase.database().ref('users/');
usersRef.on('value', (snapshot) => updateUsers(snapshot.val() === null ? {} : snapshot.val()));

addUserFx.use(async (user) => {
  await firebase.database().ref('users/').push(user);
  //return path.pieces_;
});

// Init Stores
$firebaseUsers.on([updateUsers], (_, users) => users);
