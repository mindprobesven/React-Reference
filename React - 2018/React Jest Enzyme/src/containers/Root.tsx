import * as React from 'react'
import PowerBar from '../components/PowerBar';
import Link from '../components/Link';
//import Hello from '../components/Hello';

const Root = ()  => {
  /*
    <Hello />
  */
  
  return (
    <div>
      <PowerBar name="Sven" powerLevel={15} />
      <Link page="http://www.mindprobe.io">Mindprobe.io</Link>
    </div>
  )
}

export default Root