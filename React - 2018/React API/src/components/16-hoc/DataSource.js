class DataSource {
  getData= () => {
    return new Promise((resolve, reject) => {
      resolve(new Date());
    });
    
    //return new Date();
  }
}

export default DataSource;