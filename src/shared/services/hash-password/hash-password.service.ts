import { Injectable } from '@nestjs/common';
import { PasswordHashPipe } from 'src/shared/pipes/password-hash/password-hash.pipe';

@Injectable()
export class HashPasswordService {
  constructor(private readonly passwordHashPipe: PasswordHashPipe) {}

  async hashPassword(password: string): Promise<string> {
    return this.passwordHashPipe.transform(password);
  }
}
