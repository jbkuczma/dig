;(function createEditPage() {
    let userJsonData = require('../../cookies/info.json')
    let feeds = userJsonData['feeds']
    console.log(feeds)

    /* Add save button to page */
    let saveButtonDiv = document.createElement('div')
    saveButtonDiv.className = 'saveContainer'
    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'
    saveButton.className = 'saveButton'
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
            span.textContent = user
            oneUserDiv.appendChild(span)
            oneUserDiv.appendChild(userRemoveButton)
            oneUserDiv.className = 'user'
            usersDiv.appendChild(oneUserDiv) // add user to list of user
        })
        
        /* input to add a new user at the end of each feed */
        let addUserDiv = document.createElement('div')
        let addUserInput = document.createElement('input')
        let addUserButton = document.createElement('button')
        addUserButton.textContent = 'Add User'
        addUserButton.className = 'addUserButton'
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