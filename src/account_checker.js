const axios = require('axios');
const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow

const sendButton = document.getElementById("send-btn");
const emailField = document.getElementById("email-field");
emailField.focus();

emailField.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        sendButton.click();
    }
})

sendButton.addEventListener("click", function(e) {
    document.getElementById("breach-data").innerHTML = "";
    var email = emailField.value;
    var url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + email;
    var config = {
        headers: {
            "user-agent": "Password Checker"
        }
    };
    checkAccount(url, config);
})

function checkAccount(url, config) {
    try {
        axios.get(url, config).then(res => {
            var data = res.data;
            addBreachDataToHTML(data);
        })
    } catch(e) {
        alert(e);
    }  
}

function addBreachDataToHTML(data) {
    var table = document.getElementById("breach-data");
    var row = table.insertRow();
    var name = row.insertCell(0);
    var date = row.insertCell(1);
    name.innerHTML = "Name";
    date.innerHTML = "Breach Date";
    for (var i = 0; i<data.length; i++) {
        var row = table.insertRow();
        var name = row.insertCell(0);
        var date = row.insertCell(1);
        name.innerHTML = data[i].Name;
        date.innerHTML = data[i].BreachDate;
    }
}