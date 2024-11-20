import { Timestamp } from "@angular/fire/firestore";

export interface MessageFromFirestore {
	content: string;
	createdAt: Timestamp;
	userId: string;
	username: string;
}

export interface Message{
	content: string;
	createdAt: Date;
	userId: string;
	username: string;
}