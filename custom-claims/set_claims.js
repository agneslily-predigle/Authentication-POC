// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your credentials file
const serviceAccount = require('./my-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace 'user-uid' with the UID of the user you want to assign the role to
// const uid = 'pKnmph9U6aR0VaNJnbB1yOy5PAL2';


const roles={
// "super-admin":["DkfjCSebmwe5zoVoED0N3hD53973","pKnmph9U6aR0VaNJnbB1yOy5PAL2"],
// "admin":["fZ0ZWggSBTgo7d7utwmuPVpg95z1","LkO6WhWPjETkBe7RSnt7PYH2C7F3"],
// "editor":[]
// "admin":["g1rpZz2tRnPd3ezlaSFXMXDLBxH2"],
"user":["1m1hiUJPcqQMpfJN8gk7RdffWYN2"],
"admin":["EInjOnt3OTTasWRpeWBOlnY68n53"],
"tester":["vqIcZwhUZGdBXeCHCyDodEZtT393"]
}

// const admin_list=["DkfjCSebmwe5zoVoED0N3hD53973","pKnmph9U6aR0VaNJnbB1yOy5PAL2"]

for (let i in roles){

  claim={role:[i]}
  for(let uid of roles[i]){
    console.log("uid",uid,"cliam-->",claim);
  admin.auth() .setCustomUserClaims(uid, claim)
  .then((data) => {
        console.log('Custom claims set for user',data);
  })
  .catch((error) => {
    console.log("error",error);
  });

  }
}