/* TODO ADD COMMENTS
 *      ADD CANCEL BUTTON
 *      ADD WAY OF CHANGING NUMBER OF PHOTOS PER USER PER FEED
 *      ADD WAY OF CHANGING THE NAME OF A FEED
 *      ADD WAY OF REMOVING A FEED
 * /
const fs = require('fs')
let userJsonData = require('../../cookies/info.json')
let feeds = userJsonData['feeds']

;(function createEditPage() {
    /* Add save button to page */
    let saveButtonDiv = document.createElement('div')
    let saveButton = document.createElement('button')
    saveButtonDiv.className = 'saveContainer'
    saveButton.textContent = 'Save'
    saveButton.className = 'saveButton'
    saveButton.addEventListener('click', save, false)
    saveButtonDiv.appendChild(saveButton)
    document.getElementById('editFeeds').appendChild(saveButtonDiv)


    for(let i = 0; i < feeds.length; i++) {
        let feedTitle = feeds[i]['title']
        let numberOfPhotosPerUser = feeds[i]['numberOfPhotosPerUser']
        let feedDiv = document.createElement('div')
        let titleDiv = document.createElement('div')
        let usersDiv = document.createElement('div')

        let title = document.createElement('div')
        let numberOfPhotos = document.createElement('div')

        feedDiv.className = 'feed'
        usersDiv.id = feedTitle
        
        titleDiv.className = 'titleContainer'
        title.textContent = feedTitle
        title.className = 'title'

        numberOfPhotos.textContent = numberOfPhotosPerUser
        numberOfPhotos.className = 'numberOfPhotos'

        titleDiv.appendChild(title)
        titleDiv.appendChild(numberOfPhotos)
        
        
        let users = feeds[i]['profiles']
        users.forEach((user) => {
            let oneUserDiv = document.createElement('div')
            let span = document.createElement('span')
            let userRemoveButton = document.createElement('button')
            userRemoveButton.textContent = 'Remove User'
            userRemoveButton.className = 'userRemoveButton'
            userRemoveButton.addEventListener('click', () => removeUser(user), false)
            span.textContent = user
            oneUserDiv.id = user
            oneUserDiv.appendChild(span)
            oneUserDiv.appendChild(userRemoveButton)
            oneUserDiv.className = 'user'
            usersDiv.appendChild(oneUserDiv) // add user to list of user
        })
        
        /* input to add a new user at the end of each feed */
        let addUserDiv = document.createElement('div')
        let addUserInput = document.createElement('input')
        let addUserButton = document.createElement('button')
        addUserInput.className = 'newUser'
        addUserButton.textContent = 'Add User'
        addUserButton.className = 'addUserButton'
        addUserButton.addEventListener('click', () => addUser(i, feedTitle), false)
        addUserDiv.className = 'addUserContainer'
        addUserDiv.appendChild(addUserInput)
        addUserDiv.appendChild(addUserButton)

        /* add the created divs to the page */
        feedDiv.appendChild(titleDiv)
        feedDiv.appendChild(usersDiv)
        feedDiv.appendChild(addUserDiv)
        feedDiv.appendChild(document.createElement('br')) //add a break between feeds
        
        document.getElementById('editFeeds').appendChild(feedDiv)
    }
}())

/* need to pass in an index value so we know which feed we will be inserting into */
function addUser(feedIndex, feedTitle) {
    let newUser = document.getElementsByClassName('newUser')[feedIndex].value
    if(newUser !== '') {
        let newUserDiv = document.createElement('div')
        let span = document.createElement('span')
        let userRemoveButton = document.createElement('button')
        userRemoveButton.textContent = 'Remove User'
        userRemoveButton.className = 'userRemoveButton'
        userRemoveButton.addEventListener('click', () => removeUser(newUser, users), false)
        span.textContent = newUser
        newUserDiv.id = newUser
        newUserDiv.appendChild(span)
        newUserDiv.appendChild(userRemoveButton)
        newUserDiv.className = 'user'

        /* add new user div to feed */
        let feed = document.getElementById(feedTitle)
        feed.appendChild(newUserDiv)

        /* make input text blank */
        document.getElementsByClassName('newUser')[feedIndex].value = ''
    }
}

function removeUser(user) {
    let userDivToRemove = document.getElementById(user)
    userDivToRemove.parentElement.removeChild(userDivToRemove)
}

function save() {
    infoToSave = [] // array of feed objects to save to info.json
    feedsFromPage = document.getElementsByClassName('feed')
    for(let i = 0; i < feedsFromPage.length; i++) {
        let feedData = feedsFromPage[i]
        let obj = {}
        let titleContent = feedData.childNodes[0]
        let title = titleContent.childNodes[0].childNodes[0].textContent
        let numberOfPhotosPerUser = titleContent.childNodes[1].childNodes[0].textContent //probably changing
        let usernames = feedData.childNodes[1].childNodes
        let usernamesToSave = []
        for(let j = 0; j < usernames.length; j++) {
            let usernameToAdd = usernames[j].childNodes[0].textContent
            usernamesToSave.push(usernameToAdd)
        }
        obj['title'] = title
        obj['numberOfPhotosPerUser'] = numberOfPhotosPerUser
        obj['profiles'] = usernamesToSave
        infoToSave.push(obj)
    }
    userJsonData['feeds'] = infoToSave
    let fileName = __dirname + '/../../cookies/info.json'
    fs.writeFile(fileName, JSON.stringify(userJsonData, null, 2), (error) => {
        if(error) {
            return console.log(error)
        } else {
            /* new info has been saved. now we can go back to the previous page */
            window.history.go(-1)
        }
    })
}