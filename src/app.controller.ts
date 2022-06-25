//app.controller.ts
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('logs')
  getHello(): void {
    this.logger.log('\n=====  Log level demo ==== \n');
    this.logger.warn('Calling getHello()', AppController.name);
    this.logger.log('Calling getHello()', AppController.name); //no option this.logger.info uses 'log' alias
    //no option for this.logger.http
    this.logger.verbose('Calling getHello()', AppController.name);
    this.logger.debug('Calling getHello()', AppController.name);
    //no option for this.logger.silly

    try {
      throw new Error();
    } catch (e) {
      this.logger.error(
        'Test error calling getHello()',
        e.stack,
        AppController.name,
      );
      console.log('my test error');
    }
  }

  // @Get('err')
  // getErr(): string{
  //   try {
  //     throw new Error();
  //   } catch (e) {
  //     //this.logger.error('Calling getHello()', e.stack, AppController.name);
  //     console.log('Triggered an error response', e.stack)
  //   }
  //   return 'Hello from err route';
  // }

  @Get('err')
  async demoErr() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
