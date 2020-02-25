/* eslint-disable import/prefer-default-export */
import Firebase, { db } from "../providers/firebase";

export const API_URL = "http://area.famille4.com:3000";

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

export async function getServiceActions(serviceName, type) {
  console.log(`${API_URL}/${type}s/${serviceName}`);
  try {
    const response = await fetch(`${API_URL}/${type}s/${serviceName}`);
    return await response.json();
  } catch (error) {
    return error;
  }
}
