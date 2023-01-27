import { Observable, Observer, Subscription } from 'rxjs';

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

/**
 * 005
 */
