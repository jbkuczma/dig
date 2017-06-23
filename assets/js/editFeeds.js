/** TODO
 *      CREATE NEW FEED SECTION
 *      ADD COMMENTS
 */
const fs = require('fs')
let userJsonData = require('../../cookies/info.json')
let feeds = userJsonData['feeds']

;(function createEditPage() {
    /* Add save and cancel buttons to page */
    let buttonDiv = document.createElement('div')
    let saveButton = document.createElement('button')
    let cancelButton = document.createElement('button')
    buttonDiv.className = 'saveContainer'
    saveButton.textContent = 'Save'
    saveButton.className = 'saveButton'
    saveButton.addEventListener('click', save, false)
    buttonDiv.appendChild(saveButton)
    cancelButton.className = 'cancelButton'
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', cancel, false)
    buttonDiv.appendChild(cancelButton)
    document.getElementById('editFeeds').appendChild(buttonDiv)
    document.getElementById('editFeeds').appendChild(document.createElement('br')) //add a break between the button div and create new feed div

    let newFeedDiv = document.createElement('div')
    let newFeedTitle = document.createElement('h2')
    let newFeedTitleInput = document.createElement('input')
    let newFeedNumberOfPhotosInput = document.createElement('input')
    let newFeedCreateButton = document.createElement('button')
    newFeedTitle.className = 'newFeedTitle'
    newFeedTitle.textContent = 'Create a new feed'
    newFeedTitleInput.setAttribute('placeholder', 'Feed title')
    newFeedTitleInput.id = 'newTitle'
    newFeedTitleInput.className = 'newFeedInput'
    newFeedNumberOfPhotosInput.setAttribute('placeholder', 'Number of Photos')
    newFeedNumberOfPhotosInput.id = 'newNumberOfPhotos'
    newFeedNumberOfPhotosInput.className = 'newFeedInput'
    newFeedCreateButton.addEventListener('click', createFeed, false)
    newFeedCreateButton.className = 'newFeedAddButton'
    newFeedCreateButton.textContent = 'Create'
    newFeedDiv.className = 'newFeed'
    newFeedDiv.appendChild(newFeedTitle)
    newFeedDiv.appendChild(newFeedTitleInput)
    newFeedDiv.appendChild(newFeedNumberOfPhotosInput)
    newFeedDiv.appendChild(newFeedCreateButton)
    /* add new feed div to page */
    document.getElementById('editFeeds').appendChild(newFeedDiv)

    /* Iterate over the feeds from info.json and create divs */
    for(let i = 0; i < feeds.length; i++) {
        let feedTitle = feeds[i]['title']
        let numberOfPhotosPerUser = feeds[i]['numberOfPhotosPerUser']
        let feedDiv = document.createElement('div')
        let titleDiv = document.createElement('div')
        let usersDiv = document.createElement('div')
        let title = document.createElement('input')
        let numberOfPhotos = document.createElement('input')
        let removeFeedButton = document.createElement('button')

        feedDiv.className = 'feed'
        usersDiv.id = feedTitle      
        titleDiv.className = 'titleContainer'
        // TODO: look into focus and blur for when a user clicks out of the input area to make sure the title is at least 1 char long
        title.className = 'title'
        title.setAttribute('value', feedTitle)
        title.setAttribute('placeholder', 'Name of feed')
        numberOfPhotos.className = 'numberOfPhotos'
        numberOfPhotos.setAttribute('value', numberOfPhotosPerUser)
        numberOfPhotos.setAttribute('placeholder', 'Number of photos')
        titleDiv.appendChild(title)
        titleDiv.appendChild(numberOfPhotos)

        removeFeedButton.id = feedTitle + '_removeButton'
        removeFeedButton.className = 'removeFeedButton'
        removeFeedButton.textContent = 'Delete Feed'
        removeFeedButton.addEventListener('click', () => removeFeed(feedTitle), false)

        /* Iterate over the users in each feed and create a div for them */
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
        addUserInput.placeholder = 'New user'
        addUserButton.textContent = 'Add User'
        addUserButton.className = 'addUserButton'
        addUserButton.addEventListener('click', () => addUser(i, feedTitle), false)
        addUserDiv.className = 'addUserContainer'
        addUserDiv.appendChild(addUserInput)
        addUserDiv.appendChild(addUserButton)

        /* add the created divs to the page */
        feedDiv.appendChild(titleDiv)
        feedDiv.appendChild(removeFeedButton)
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
        let title = titleContent.childNodes[0].value
        let numberOfPhotosPerUser = titleContent.childNodes[1].value
        if(title === '' || numberOfPhotosPerUser === '') {
            return
        }
        let usernames = feedData.childNodes[2].childNodes
        let usernamesToSave = []
        for(let j = 0; j < usernames.length; j++) {
            let usernameToAdd = usernames[j].childNodes[0].textContent
            usernamesToSave.push(usernameToAdd)
        }
        obj['title'] = title
        obj['numberOfPhotosPerUser'] = numberOfPhotosPerUser
        obj['profiles'] = usernamesToSave
        console.log(obj)
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

function cancel() {
    window.history.go(-1)
}

function removeFeed(feedTitle) {
    let feedToRemove = document.getElementById(feedTitle)
    let parentOfFeedToRemove = feedToRemove.parentElement
    let parent = parentOfFeedToRemove.parentElement
    parent.removeChild(parentOfFeedToRemove)
}

/* when the button is clicked, the values in both inputs will be used to create a new feed and add to th list of existing feeds */
function createFeed() {
    let title = document.getElementById('newTitle').value
    let numberOfPhotos = document.getElementById('newNumberOfPhotos').value
    if(title.length < 1 || !Number.isInteger(parseInt(numberOfPhotos, 10))) {
        return
    }
    let newFeed = document.createElement('div')

    let titleDiv = document.createElement('div')
    let usersDiv = document.createElement('div')
    let titleInput = document.createElement('input')
    let numberOfPhotosInput = document.createElement('input')
    let removeFeedButton = document.createElement('button')
    /* title and number of photos input*/
    newFeed.className = 'feed'
    usersDiv.id = title      
    titleDiv.className = 'titleContainer'
    titleInput.className = 'title'
    titleInput.setAttribute('value', title)
    titleInput.setAttribute('placeholder', 'Name of feed')
    numberOfPhotosInput.className = 'numberOfPhotos'
    numberOfPhotosInput.setAttribute('value', numberOfPhotos)
    numberOfPhotosInput.setAttribute('placeholder', 'Number of photos')
    titleDiv.appendChild(titleInput)
    titleDiv.appendChild(numberOfPhotosInput)
    removeFeedButton.id = title + '_removeButton'
    removeFeedButton.className = 'removeFeedButton'
    removeFeedButton.textContent = 'Delete Feed'
    removeFeedButton.addEventListener('click', () => removeFeed(title), false)
    /* add user button */
    let addUserDiv = document.createElement('div')
    let addUserInput = document.createElement('input')
    let addUserButton = document.createElement('button')
    addUserInput.className = 'newUser'
    addUserInput.placeholder = 'New user'
    addUserButton.textContent = 'Add User'
    addUserButton.className = 'addUserButton'
    addUserButton.addEventListener('click', () => addUser(0, title), false) // 0 is hardcoded for the index since we are adding this list to the beginning of feeds
    addUserDiv.className = 'addUserContainer'
    addUserDiv.appendChild(addUserInput)
    addUserDiv.appendChild(addUserButton)


    newFeed.appendChild(titleDiv)
    newFeed.appendChild(removeFeedButton)
    newFeed.appendChild(usersDiv)
    newFeed.appendChild(addUserDiv)
    newFeed.appendChild(document.createElement('br')) //add a break between feeds

    document.getElementsByClassName('newFeed')[0].appendChild(newFeed)
}