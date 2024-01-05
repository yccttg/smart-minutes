"use client";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export type Member = {
  full_name: string;
  wallet_address: `$0x${string}`;
  is_member: boolean;
  role: string;
};

const app = initializeApp({
  projectId: "smart-minutes-nft",
});

const db = getFirestore(app);

// Get a list of users
export async function getUsers() {
  const usersCol = collection(db, "members");
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs[0].data().members;
}

export * as FirebaseUtils from "./firebaseUtils";
