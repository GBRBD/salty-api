import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private _firebaseUserId: string;

  get firebaseUserId(): string {
    return this._firebaseUserId;
  }

  userIdLookup(uid: string) {
    return admin
      .auth()
      .getUser(uid)
      .catch(err => {
        if (err) {
          console.log(err);
          throw new UnauthorizedException();
        }
      });
  }

  async validateIdToken(token: string): Promise<boolean> {
    const result = await admin
      .auth()
      .verifyIdToken(token)
      .catch(err => {
        if (err) {
          throw new UnauthorizedException();
        }
      });

    if (result) {
      /* tslint:disable:no-string-literal */
      this._firebaseUserId = result['uid'];
    }
    /* tslint:disable:no-string-literal */
    return !!result['uid'].length;
  }

  updateUser(uid: string, email: string) {
    return admin.auth().updateUser(uid, {
      email,
    });
  }

  deleteUser(uid: string) {
    return admin.auth().deleteUser(uid);
  }
}
