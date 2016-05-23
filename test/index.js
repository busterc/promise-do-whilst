import assert from 'assert';
import promiseDoWhilst from '../lib';

describe('promise-do-whilst', function () {
  it('should "do" loop 5 times', function (done) {
    let count = 0;
    promiseDoWhilst(() => {
      count++;
    }, () => {
      return count < 5;
    }).then(() => {
      assert(count === 5, 'did not log 5 "do" loops');
      done();
    });
  });

  it('should "do" once but not loop', function (done) {
    let count = 0;
    promiseDoWhilst(() => {
      count++;
    }, () => {
      return count === -1;
    }).then(() => {
      assert(count === 1, 'did not "do" only once');
      done();
    });
  });

  it('should pass the result of "action" to "condition"', function (done) {
    let count = 0;
    promiseDoWhilst(() => {
      count++;
      return count;
    }, (counter) => {
      assert(typeof counter === 'number', 'did not pass the "action" result');
      return counter === -1;
    }).then(() => {
      assert(count === 1, 'did not "do" only once');
      done();
    });
  });
});
