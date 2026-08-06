import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ||
        'XOICIvHF0bKjHMx9yNYGvGSMvRKJUK7Guq89V0Rx9T0=',
    });
  }

  async validate(payload: { id: string; name: string; email: string }) {
    return {
      userId: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}
