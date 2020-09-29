const cardContainer = document.querySelector('div.row.cards')
const homeOwnerBtn = document.querySelector('button.btn.homeowner')
const contractorBtn = document.querySelector('button.btn.contractor')
const homeownerForm = document.querySelector('form#homeowner')

fetch('http://localhost:3000/jobs')
    .then(response => response.json())
    .then(jobsArray => {
        jobsArray.forEach(job => {
            turnJobIntoCard(job)
        })
    })

const handleCreateUserAndJob = (username, zipcode, isComplete = false, description) => {
    fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username
            }),
        })
        .then(response => response.json())
        .then(newUserObj => {
            let user_id;
            user_id = newUserObj.id
            handleCreateJob(zipcode, isComplete, description, user_id)
        })
}

const handleCreateJob = (zipcode, isComplete = false, description, user_id) => {
    fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                zipcode: zipcode,
                isComplete: isComplete,
                description: description,
                user_id: user_id
            })
        })
        .then(response => response.json())
        .then(newJobObj => {
            turnJobIntoCard(newJobObj)
        })
}

homeOwnerBtn.addEventListener('click', event => {
    let formGroupA = document.createElement('div')
    formGroupA.classList.add('form-group')
    let usernameLabel = document.createElement('label')
    usernameLabel.setAttribute('for', 'username')
    usernameLabel.innerText = 'Username'
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute('id', 'username')
    usernameInput.type = 'text'
    usernameInput.classList.add('form-control')

    let formGroupB = document.createElement('div')
    formGroupB.classList.add('form-group')
    let zipcodeLabel = document.createElement('label')
    zipcodeLabel.setAttribute('for', 'zipcode')
    zipcodeLabel.innerText = 'Zipcode'
    let zipcodeInput = document.createElement('input')
    zipcodeInput.setAttribute('id', 'zipcode')
    zipcodeInput.type = 'text'
    zipcodeInput.classList.add('form-control')

    let formGroupC = document.createElement('div')
    formGroupC.classList.add('form-group')
    let descriptionLabel = document.createElement('label')
    descriptionLabel.setAttribute('for', 'description-text')
    descriptionLabel.innerText = 'Description'
    let descriptionText = document.createElement('textarea')
    descriptionText.setAttribute('id', 'description-text')
    descriptionText.type = 'text'
    descriptionText.style = 'width: 300px; height: 200px'
    descriptionText.classList.add('form-control')

    let submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.classList.add('btn', 'btn-primary', 'mb-2')
    submitBtn.innerText = 'submit'

    formGroupA.append(usernameLabel, usernameInput)
    formGroupB.append(zipcodeLabel, zipcodeInput)
    formGroupC.append(descriptionLabel, descriptionText)
    homeownerForm.innerHTML = ''
    homeownerForm.append(formGroupA, formGroupB, formGroupC, submitBtn)

    homeownerForm.addEventListener('submit', event => {
        event.preventDefault()

        let username = event.target.username.value
        let zipcode = event.target.zipcode.value
        let jobDescription = event.target['description-text'].value

        handleCreateUserAndJob(username, zipcode, isComplete = false, jobDescription)
        homeownerForm.reset()
        homeownerForm.innerHTML = ''
    })
})


contractorBtn.addEventListener('click', event => {
    homeownerForm.innerHTML = ''
})


const renderBids = (job, parentNode) => {
    let cardBorder = document.createElement('div')
    cardBorder.classList.add('card', 'border-dark')
    parentNode.append(cardBorder)
    job.bids.forEach(bid => {
        let cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header', 'bg-secondary', 'text-light')
        cardHeader.innerText = 'Bid Amount: $' + bid.bid_amount
        parentNode.append(cardBorder)
        cardBorder.append(cardHeader)

        let h5 = document.createElement('h5')
        h5.innerText = 'From: ' + bid.contractor.business_name
        cardHeader.append(h5)

        let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        cardBorder.append(cardBody)

        let p = document.createElement('p')
        p.innerText = bid.comment
        cardBody.append(p)
    })
}

const turnJobIntoCard = (job) => {
    let outerCard = document.createElement('div')
    outerCard.classList.add('col-md-6', 'col-lg-4', 'mb-3')

    let cardBorder = document.createElement('div')
    cardBorder.classList.add('card', 'border-dark')

    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header', 'bg-dark', 'text-light')
    cardHeader.innerText = 'Zipcode: ' + job.zipcode
    outerCard.append(cardBorder)
    cardBorder.append(cardHeader)

    let h5 = document.createElement('h5')
    h5.classList.add('m-0')
    h5.innerText = 'Posted by: ' + job.user.username
    cardHeader.append(h5)

    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBorder.append(cardBody)

    let p = document.createElement('p')
    p.innerText = job.description
    cardBody.append(p)

    cardContainer.append(outerCard)

    let cardFooter = document.createElement('div')
    cardFooter.classList.add('d-flex', 'card-footer')
    cardBorder.append(cardFooter)

    let createBidBtn = document.createElement('button')
    createBidBtn.type = 'click'
    createBidBtn.innerText = 'create bid'
    createBidBtn.classList.add('btn', 'create-bid')
    createBidBtn.style = "background: rgb(120,194,173);"
    cardFooter.append(createBidBtn)

    createBidBtn.addEventListener('click', event => {
        cardFooter.innerHTML = ''
        let bidForm = document.createElement('form')
        bidForm.id = 'bid-form'
        let formGroupA = document.createElement('form-group')
        formGroupA.classList.add('form-group')
        let businessNameLabel = document.createElement('label')
        businessNameLabel.setAttribute('for', 'business-name')
        businessNameLabel.innerText = 'Business Name'
        let businessNameInput = document.createElement('input')
        businessNameInput.setAttribute('id', 'business-name')
        businessNameInput.type = 'text'
        businessNameInput.classList.add('form-control')
        let bidAmountLabel = document.createElement('label')
        bidAmountLabel.setAttribute('for', 'bid-amount')
        bidAmountLabel.innerText = 'Bid Amount'
        let bidAmountInput = document.createElement('input')
        bidAmountInput.id = 'bid-amount'
        bidAmountInput.type = 'text'
        bidAmountInput.classList.add('form-control')
        let bidTextLabel = document.createElement('label')
        bidTextLabel.setAttribute('for', 'bid-text')
        bidTextLabel.innerText = 'Comment'
        let bidText = document.createElement('textarea')
        bidText.setAttribute('id', 'bid-text')
        bidText.type = 'text'
        bidText.style = 'width: 300px; height: 200px'
        bidText.classList.add('form-control')
        let submitBidBtn = document.createElement('button')
        submitBidBtn.type = 'submit'
        submitBidBtn.innerText = 'submit bid'
        submitBidBtn.classList.add('btn', 'submit-bid', 'mt-2')
        submitBidBtn.style = "background: rgb(120,194,173);"

        formGroupA.append(businessNameLabel, businessNameInput, bidAmountLabel, bidAmountInput, bidTextLabel, bidText)
        bidForm.append(formGroupA, submitBidBtn)
        cardFooter.append(bidForm)

        bidForm.addEventListener('submit', event => {
            event.preventDefault()
            let newContractor;
            let businessNameInput = event.target['business-name'].value
            let newBidAmount = event.target['bid-amount'].value
            let newBidText = event.target['bid-text'].value

            fetch('http://localhost:3000/contractors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        business_name: businessNameInput
                    })
                })
                .then(response => response.json())
                .then(newContractorObj => {
                    newContractor = newContractorObj

                    fetch('http://localhost:3000/bids', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                job_id: job.id,
                                contractor_id: newContractor.id,
                                bid_amount: newBidAmount,
                                isAccepted: false,
                                comment: newBidText,
                            })
                        })
                        .then(response => response.json())
                        .then(newBidObj => {
                            let cardBorder = document.createElement('div')
                            cardBorder.classList.add('card', 'border-dark')
                            outerCard.append(cardBorder)

                            let cardHeader = document.createElement('div')
                            cardHeader.classList.add('card-header', 'bg-secondary', 'text-light')
                            cardHeader.innerText = 'Bid Amount: $' + newBidObj.bid_amount
                            outerCard.append(cardBorder)
                            cardBorder.append(cardHeader)

                            let h5 = document.createElement('h5')
                            h5.innerText = 'From: ' + newBidObj.contractor.business_name
                            cardHeader.append(h5)

                            let cardBody = document.createElement('div')
                            cardBody.classList.add('card-body')
                            cardBorder.append(cardBody)

                            let p = document.createElement('p')
                            p.innerText = newBidObj.comment
                            cardBody.append(p)

                            cardFooter.innerHTML = ''
                        })
                })
        })

    })

    renderBids(job, outerCard)
}