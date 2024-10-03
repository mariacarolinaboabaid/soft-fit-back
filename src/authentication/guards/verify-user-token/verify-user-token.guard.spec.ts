import { VerifyUserTokenGuard } from './verify-user-token.guard';

describe('VerifyUserTokenGuard', () => {
  it('should be defined', () => {
    expect(new VerifyUserTokenGuard()).toBeDefined();
  });
});
