import { app, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

const localpath = path.join(app.getPath('userData'), '/')

let childpids = [];

let mainWindow

function startService() {
  /* start the spark-store-rust prorgam to
   * listen on a local port (7800) and
   * serve on a websocket address.
   * The process handles:
   * 1. Implement downloads
   * 2. Implement app instllation, desktop files, exec etc
   * 3. Handle app deletion
   * 4. Handle all other native ability requires trust
   */
    // const appRootDir = require('app-root-dir').get();
    console.log("info: main PID is: ", process.pid);
    console.log("info: platform is: ", process.platform);
    console.log("info: localpath is: ", localpath);
    spwanDownloader();
}
function spwanDownloader() {
    /*
     * 1. start the downloader aria2c
     * 2. close the downloader on app exit
     * 3. TODO consider detach the downloader for background mode
     * */
    const process = require('process');
    const spawn = require( 'child_process' ).spawn;
    const child = spawn('aria2c', ['--enable-rpc', '-d', localpath]);
    console.log("info: aria2c pid is :", child.pid);
    childpids.push(child.pid);
    process.on('exit', (code)=> {
        for(let pid of childpids) {
            process.kill(pid, 'SIGTERM');
            console.log("info: main SIGTERM child pid", pid);
        }
    });
    child.on('error', (code)=> {
        console.log( `info: aria2c: error exit: with ret code ${code}` );
    });
    child.on('exit', (code)=> {
        console.log( `info: aria2c: exit: with ret code ${code}` );
        if(code == 1) {
          for(let pid of childpids) {
              process.kill(pid, 'SIGTERM');
              console.log("info: main SIGTERM child pid", pid);
          }
          spwanDownloader();
        }
    });
    child.stdout.on( 'data', data => {
        console.log( `info: aria2c: stdout: ${data}` );
    });
}

function createWindow () {
  startService()
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    },
    frame: false,
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
