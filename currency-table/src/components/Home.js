import React from "react";
import Calculator from './Calculator';
import Cryptotable from './Cryptotable';


function Home() {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '40px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '100px 0',
        
      }}>
        <Calculator />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        
      }}>
        <Cryptotable />
      </div>
    </div>
  );
}

export default Home;
