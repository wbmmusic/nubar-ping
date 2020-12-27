import { useEffect } from 'react';
import Top from './components/Top'
import Updates from './Updates'

const { ipcRenderer } = window.require('electron')

function App() {


  useEffect(() => {
    ipcRenderer.on('message', (e, theMessage) => {
      console.log(theMessage)
    })

    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      document.title = 'nubar-ping --- v' + arg.version;
    });


    ipcRenderer.send('reactIsReady')

    return () => {
      ipcRenderer.removeListener('reactIsReady')
    }
  }, [])


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      overflow: 'hidden'
    }}>
      <Top />
      <Updates />
    </div>
  );
}

export default App;
