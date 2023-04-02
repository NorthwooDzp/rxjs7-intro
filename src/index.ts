import { interval, Observable, Observer, Subscription } from 'rxjs';

/**
 * Module 02
 */

function module02() {
  const namesObservable$ = new Observable<string>((subscriber) => {
    console.log('Names Observable executed');
    subscriber.next('Alice');

    setTimeout(() => {
      subscriber.next('Ben');
    }, 2000);
    setTimeout(() => {
      subscriber.next('Charlie');
    }, 4000);

    setTimeout(() => {
      // subscriber.error(new Error('Unhandled exception'));
    }, 6000);

    setTimeout(() => {
      subscriber.complete();
    }, 8000);
  });

  const createNamesObserver: (name: string) => Partial<Observer<string>> = (
    name: string
  ) => ({
    next: (value: string) => {
      console.log(`${name}: `, value);
    },
    error: (err) => {
      console.log(`${name}: `, err);
    },
    complete: () => {
      console.log(`${name}: `, 'observable completed');
    },
  });

  const namesSubs: Subscription = namesObservable$.subscribe(
    createNamesObserver('Subs 1')
  );

  const namesSubs2: Subscription = namesObservable$.subscribe(
    createNamesObserver('Subs 2')
  );

  setTimeout(() => {
    console.log('Unsubscribe');
    namesSubs.unsubscribe();
    namesSubs2.unsubscribe();
  }, 10000);
}

// module02();

/**
 * Module 03
 */

function module03() {
  const stream$ = new Observable<string>((subscriber) => {
    console.log('stream has been created');
    subscriber.next('Alice');
    subscriber.next('Ben');

    setTimeout(() => {
      subscriber.next('Charlie');
      // subscriber.complete();
    }, 2000);

    setTimeout(() => {
      subscriber.error(new Error('Stream failed'));
    }, 4000);

    setTimeout(() => {
      subscriber.complete();
    }, 3000);

    return () => {
      console.log('teardown');
    };
  });

  console.log('before subscribe');
  const subs = stream$.subscribe({
    next: (val) => {
      console.log(val);
    },
    error: (err: Error) => console.log(err.message),
    complete: () => console.log('complete'),
  });
  console.log('after subscribe');

  const stream2$ = new Observable((subscriber) => {
    let counter = 1;
    const interval = setInterval(() => {
      console.log(`Emited => ${counter}`);
      subscriber.next(counter++);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  });

  const subs2 = stream2$.subscribe((val) => console.log(val));

  setTimeout(() => {
    subs2.unsubscribe();
  }, 5000);
}

module03();

/**
 * Module 04
 */

function module04() {}

module04();

/**
 * 03/007
 * 03/003 review
 *
 */
