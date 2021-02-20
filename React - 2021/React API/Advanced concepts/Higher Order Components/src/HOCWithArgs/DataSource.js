class DataSource {
  constructor() {
    this.intervalID = null;
    this.counter = 0;
    this.dogArticles = [];
    this.catArticles = [];
  }

  addChangeListener(callback) {
    console.log('Started');
    this.intervalID = setInterval(() => {
      this.updateArticles();
      callback();
    }, 1000);
  }

  removeChangeListener() {
    clearInterval(this.intervalID);
  }

  updateArticles() {
    console.log('Update');
    if (this.counter <= 10) {
      this.dogArticles = [...this.dogArticles, `Dog article ${this.counter} `];
      this.catArticles = [...this.catArticles, `Cat article ${this.counter} `];
    } else {
      clearInterval(this.intervalID);
    }
    this.counter += 1;
  }

  getArticles(id) {
    if (id === 'dog') {
      return this.dogArticles;
    }

    if (id === 'cat') {
      return this.catArticles;
    }

    return null;
  }
}

export default DataSource;
