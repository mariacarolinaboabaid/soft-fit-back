import { forwardRef, Module } from '@nestjs/common';
import { IsUsernameUniqueValidator } from './validators/is-username-unique/is-username-unique';
import { ClientsModule } from 'src/clients/clients.module';
import { HashPasswordService } from './services/hash-password/hash-password.service';
import { CustomersModule } from 'src/customers/customers.module';
import { PasswordHashPipe } from './pipes/password-hash/password-hash.pipe';

@Module({
  imports: [forwardRef(() => ClientsModule), forwardRef(() => CustomersModule)],
  providers: [IsUsernameUniqueValidator, PasswordHashPipe, HashPasswordService],
  exports: [IsUsernameUniqueValidator, PasswordHashPipe, HashPasswordService],
})
export class SharedModule {}
