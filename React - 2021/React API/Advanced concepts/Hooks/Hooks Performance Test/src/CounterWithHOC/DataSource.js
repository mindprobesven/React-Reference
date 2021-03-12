class DataSource {
  static intervalID = null;

  static counter = 0;

  static subscribers = [];

  static addSubscriber(subscriberCallback) {
    this.subscribers.push(subscriberCallback);
  }

  static updateSubscribers() {
    this.subscribers.forEach((subscriberCallback) => {
      subscriberCallback();
    });
  }

  static subscribe(subscriberCallback) {
    this.addSubscriber(subscriberCallback);

    if (!this.intervalID) {
      this.intervalID = setInterval(() => {
        this.updateCounter();
        this.updateSubscribers();
      }, 1000);
    }
  }

  static unsubscribe() {
    clearInterval(this.intervalID);
    this.subscribers = [];
  }

  static updateCounter() {
    this.counter += 1;
  }

  static getCounter() {
    return this.counter;
  }

  static resetCounter() {
    this.counter = 0;
    this.updateSubscribers();
  }

  static stopCounter() {
    clearInterval(this.intervalID);
  }
}

export default DataSource;
