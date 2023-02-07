import React from 'react';
import Logo from './assets/logo.svg';
import Screen from './assets/screen.png';

export const App: React.FC = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between py-5 px-5 md:px-10'>
        <div className='flex items-center'>
          <img src={Logo} alt='' className='w-8' />
          <h2 className='font-medium text-xl ml-2'>
            Snorlax <span className='text-sm text-app-dark3'>v1.0.0</span>
          </h2>
        </div>
        <a
          href='https://github.com/hyfic/snorlax'
          className='font-medium text-app-dark3 transition-all duration-200 hover:opacity-80'
        >
          Github
        </a>
      </div>
      <div className='mt-20 flex flex-col items-center w-full'>
        <div className='w-full lg:w-3/5 p-5 flex flex-col items-center'>
          <h2 className='font-semibold text-lg ml-1 text-center bg-app-dark3 px-5 py-3 rounded-full text-app-text'>
            Snorlax v1.0.0
          </h2>
          <h1 className='my-6 text-6xl font-bold text-center'>
            Build Your Own <span className='text-app-accent'>File Server</span>
          </h1>
        </div>
        <img
          src={Screen}
          alt=''
          className='w-11/12 md:w-4/5 lg:w-1/2 shadow-2xl'
        />

        <div className='w-full lg:w-3/5 p-5'>
          <div className='my-10 flex justify-center items-center'>
            <button className='px-5 py-3 bg-app-accent text-app-text font-medium text-xl rounded-md'>
              Download
            </button>
          </div>
          <h2 className='font-medium text-2xl'>About</h2>
          <p className='mt-3 text-xl'>
            Snorlax is an open source cloud storage software, where users can
            run server, and connect to multiple servers and manage files in
            server using Client.
          </p>
        </div>
      </div>
      <div className='mt-20'></div>
    </div>
  );
};

export default App;
