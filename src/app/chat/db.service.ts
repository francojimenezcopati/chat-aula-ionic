import { inject, Injectable } from '@angular/core';
import { Message, MessageFromFirestore } from './message.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
    providedIn: 'root',
})
export class DbService {
	firestore = inject(AngularFirestore)

    constructor() {}

    public getMessages(collectionPath: string): Observable<Message[]> {
        return this.firestore
            .collection(collectionPath)
            .get()
            .pipe(
                map((messagesFromDB) => {
                    const messages = messagesFromDB.docs.map((message) => {
                        const messageObj =
                            message.data() as MessageFromFirestore;
                        return {
                            ...messageObj,
                            createdAt: messageObj.createdAt.toDate(),
                        } as Message;
                    });

                    return messages.sort(
                        (m, m2) =>
                            m.createdAt.getTime() - m2.createdAt.getTime()
                    );
                })
            );
    }

    public async addDocument(collectionPath: string, data: any) {
        this.firestore.collection(collectionPath).add(data);
    }
}
