/* eslint-disable import/prefer-default-export */
import Firebase, { db } from "../providers/firebase";

export const API_URL = "https://area.cap.famille4.com";

export async function getIdToken() {
  return Firebase.auth().currentUser.getIdToken();
}

function generateUserRequest(method = "GET") {
  return {
    method,
    headers: {
      Authorization: getIdToken()
    }
  };
}

export const getAllServices = async () => {
  try {
    const snapshot = await db.collection("Services").get();
    return snapshot.docs.map(doc => doc.data());
  } catch (e) {
    return e;
  }
};

export const getUserAREA = email => {
  return new Promise((resolve, reject) => {
    const tmp = [];
    try {
      db.collection("Area")
        .where("user", "==", email)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            tmp.push({ id: doc.id, data: doc.data() });
          });
          resolve(tmp);
        })
        .catch(function(error) {
          reject(error);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export async function getServiceActions(serviceName, type) {
  console.log(`${API_URL}/${type}s/${serviceName}`);
  try {
    const response = await fetch(`${API_URL}/${type}s/${serviceName}`);
    return await response.json();
  } catch (error) {
    return error;
  }
}
