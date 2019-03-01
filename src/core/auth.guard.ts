import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request.headers.authorization);
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];

      if (token) {
        return this.firebaseService.validateIdToken(token);
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
