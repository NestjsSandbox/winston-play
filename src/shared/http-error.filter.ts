//* http-error.filter.ts

import {   ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status = exception.getStatus();

    //Feature-1: Custom tailored error response
    const errResponse = {
      code: status,
      name: exception.name,
      timestamp: new Date().toLocaleDateString(),
      path: req.url,
      method: req.method,
      message: exception.message || exception || null,
    };

    res.status(status).json(errResponse);


    //Feature-2: Custom error logging
    Logger.error(
      `Custom error :\n method is: ${req.method} \n url is :${req.url}`,
      exception.stack,
      'MyExceptionFilter',
    );

  }
}
