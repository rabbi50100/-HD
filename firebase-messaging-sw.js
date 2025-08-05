importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD-tlrPK8s9h87PVqtvprBy_phcCqONLeU",
    authDomain: "my-movie-81a4b.firebaseapp.com",
    databaseURL: "https://my-movie-81a4b-default-rtdb.firebaseio.com",
    projectId: "my-movie-81a4b",
    storageBucket: "my-movie-81a4b.firebasestorage.app",
    messagingSenderId: "249876555391",
    appId: "1:249876555391:web:81f3ad52805b0aa314c14a"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
        data: {
            url: payload.data.url
        }
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
