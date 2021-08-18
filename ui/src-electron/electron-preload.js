/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
 import { contextBridge, remote } from 'electron'

 contextBridge.exposeInMainWorld('spk', {
   windowActions: function(act) {
      let win = remote.getCurrentWindow();
      if(act == "close") {
        win.close();
      } else if (act == "minimize") {
        win.minimize();
      } else if (act == "maximize") {
        if(!win.isMaximized()) {
          win.maximize();
        } else {
          win.unmaximize();
        }
      } else {
        console.log("bad usage of windowActions");
      }
    }
 })
