class DataSource {
  constructor() {
    this.intervalID1 = null;
    this.counter1 = 0;
  }

  addChangeListener(callback) {
    this.intervalID1 = setInterval(() => {
      this.updateCounter();
      callback();
    }, 1000);
  }

  removeChangeListener() {
    clearInterval(this.intervalID1);
  }

  updateCounter() {
    this.counter1 += 1;
    if (this.counter1 >= 5) clearInterval(this.intervalID1);
  }

  getCounter(id) {
    if (id === 1) {
      return this.counter1;
    }

    return null;
  }
}

export default DataSource;
