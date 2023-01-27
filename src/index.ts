import { Observable, Observer, Subscription } from "rxjs";

const namesObservable$ = new Observable<string>((subscriber) => {
  console.log("Names Observable executed");
  subscriber.next("Alice");

  setTimeout(() => {
    subscriber.next("Ben");
  }, 2000);
  setTimeout(() => {
    subscriber.next("Charlie");
  }, 4000);

  setTimeout(() => {
    subscriber.error(new Error("Unhandled exception"));
  }, 4500);

  // subscriber.complete();
});

const namesObserver: Partial<Observer<string>> = {
  next: (value: string) => {
    console.log(value);
  },
  error: (err) => {
    console.log(err);
  },
  complete: () => {
    console.log("observable completed");
  },
};

const namesSubs: Subscription = namesObservable$.subscribe(namesObserver);

const namesSubs2: Subscription = namesObservable$.subscribe(namesObserver);

setTimeout(() => {
  console.log("Unsubscribe");
  namesSubs.unsubscribe();
  namesSubs2.unsubscribe();
}, 10000);

/**
 * 004
 */
