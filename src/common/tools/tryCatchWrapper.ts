import { HttpException, HttpStatus } from '@nestjs/common';

function tryCatchWrapper(f) {
  return function () {
    try {
      // eslint-disable-next-line prefer-rest-params
      f.apply(this, arguments);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.NOT_FOUND,
      );
    }
  };
}

export default tryCatchWrapper;
