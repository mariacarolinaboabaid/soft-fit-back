import { forwardRef, Module } from '@nestjs/common';
import { IsUsernameUniqueValidator } from './validators/is-username-unique/is-username-unique';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [forwardRef(() => ClientsModule)],
  providers: [IsUsernameUniqueValidator],
  exports: [IsUsernameUniqueValidator],
})
export class SharedModule {}
