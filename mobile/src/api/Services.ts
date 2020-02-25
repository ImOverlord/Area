/* eslint-disable import/prefer-default-export */
import { db } from "../providers/firebase";

const API_URL = "http://area.famille4.com:3000";

export const getAllServices = async () => {
  try {
    const snapshot = await db.collection("Services").get();
    return snapshot.docs.map(doc => doc.data());
  } catch (e) {
    return e;
  }
};

export async function getServiceActions(serviceName) {
  try {
    const response = await fetch(`${API_URL}/actions/${serviceName}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
