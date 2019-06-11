const axios = require('axios');
const sha1 = require('js-sha1');
const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow

const sendButton = document.getElementById("send-btn");
const passwordField = document.getElementById("password-field");
passwordField.focus();

passwordField.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        sendButton.click();
    }
})

sendButton.addEventListener("click", function(e) {
    var password = passwordField.value;
    var hashedPassword = sha1(password).toUpperCase();
    var shortenedHash = hashedPassword.slice(0, 5);
    var url = "https://api.pwnedpasswords.com/range/" + shortenedHash;
    checkPassword(url, hashedPassword);
})

function checkPassword(url, hashedPassword) {
    axios.get(url).then(res => {
        var data = res.data;
        if (data.includes(hashedPassword.slice(5, 40))) {
            createPopup('pwned_popup.html');
        } else {
            createPopup('safe_popup.html');
        }
    })
}

function createPopup(file) {
    const modalPath = path.join('file://', __dirname, file);
    let win = new BrowserWindow({ resizable: false, center: true, alwaysOnTop: true, autoHideMenuBar: true, transparent: true, width: 250, height: 250, frame: false})
    win.on('close', function () { win = null });
    win.loadURL(modalPath);
    win.show();
}