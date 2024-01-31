const admin = require('firebase-admin');
const serviceAccount = require('./my-credentials.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const getUserRole = (uid) => {
        admin.auth().getUser(uid)
        .then((userRecord) => {
                // console.log(userRecord)
                console.log(uid,"has the role -->", userRecord.customClaims.role);
        });
}

let userIdArray = [
        "OmN4qa2mZ4NxN1WCWh8Dh8mv2JI2", // agnes lily
        "XkRny2EkhqUIweJ6AzgcOBDPtyx1",          // sibi
        "5d54t0cX7XZt2JenxF4M2utuDBQ2",         // george
]

for (let uid of userIdArray){
        getUserRole(uid)
}