const {app, BrowserWindow, ipcMain} = require('electron')

const path = require('path')
const url = require('url')
const fs = require('fs')

const ig = require('./instagram.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let userIsAlreadyLoggedIn = true;
/* 
  init, automatically called 
  check for files needed for private ig
*/
(function init(){
  let cookieDirectory = __dirname + '/cookies'
  let igJson = __dirname + '/cookies/user.json'
  if(!fs.existsSync(cookieDirectory)) {
    fs.mkdirSync(cookieDirectory)
    userIsAlreadyLoggedIn = false
  }
  if(!fs.existsSync(igJson)) {
    fs.closeSync(
      fs.openSync(igJson, 'w')
    )
     userIsAlreadyLoggedIn = false
  }
})()

// private ig
var Client = require('instagram-private-api').V1;
var device = new Client.Device('user');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/user.json');

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    backgroundColor: '#FBFBFB'
  })

  if (userIsAlreadyLoggedIn) {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  } else {
    // user is not logged in, show them the login in screen
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'login.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  mainWindow.webContents.openDevTools()

  ipcMain.on('loginSuccessful', (event, data) => {
      console.log('success')
      console.log(data)
      // write username and password to file
      mainWindow.reload()
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
