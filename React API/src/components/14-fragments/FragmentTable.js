import React, {Component} from 'react';

const Column = () => {
  return (
    <React.Fragment>
      <td>Audi</td>
      <td>BMW</td>
      <td>Mercedes</td>
      <td>A group of children</td>
    </React.Fragment>
  );
}

class FragmentTable extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <Column />
          </tr>
          <tr>
            <Column />
          </tr>
          <tr>
            <Column />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default FragmentTable;