import firebase from "firebase";

const config = {
	apiKey: "<AIzaSyAvFIafXdqrmn8f0u94y8jbqRvBdYLqFB0",
	authDomain: "simple-14d89.firebaseapp.com",
	databaseURL: "https://simple-14d89.firebaseio.com",
	storageBucket: "simple-14d89.appspot.com",
};
firebase.initializeApp(config);

export default firebase;