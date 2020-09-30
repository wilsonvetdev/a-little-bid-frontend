const cardContainer = document.querySelector('div.row.cards')
const homeOwnerBtn = document.querySelector('button.btn.homeowner')
const contractorBtn = document.querySelector('button.btn.contractor')
const homeownerForm = document.querySelector('form#homeowner')
const jobsBanner = document.querySelector('h1.text-center.mb-4')

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
            if (newJobObj) {
                let alertDiv = document.createElement('div')
                alertDiv.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show')
                alertDiv.setAttribute('role', 'alert')
                alertDiv.innerText = 'New job added successfully!'
                let dismissBtn = document.createElement('button')
                dismissBtn.type = 'button'
                dismissBtn.classList.add('close', 'mt-2')
                dismissBtn.setAttribute('data-dismiss', 'alert')
                dismissBtn.setAttribute('aria-label', 'Close')
                dismissBtn.innerText = 'x'
                let span = document.createElement('span')
                span.setAttribute('data-hidden', 'true')
                span.innerText = '&times;'
                alertDiv.append(dismissBtn)
                jobsBanner.append(alertDiv)
            }
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

    let cardFooterA = document.createElement('div')
    cardFooterA.classList.add('d-flex', 'card-footer')
    cardBorder.append(cardFooterA)

    let cardFooterB = document.createElement('div')
    cardFooterB.classList.add('d-flex', 'card-footer')
    cardBorder.append(cardFooterB)

    let createBidBtn = document.createElement('button')
    createBidBtn.type = 'click'
    createBidBtn.innerText = 'create bid'
    createBidBtn.classList.add('btn', 'create-bid')
    createBidBtn.style = "background: rgb(120,194,173);"
    cardFooterA.append(createBidBtn)

    let deleteJobBtn = document.createElement('button')
    deleteJobBtn.type = 'click'
    deleteJobBtn.innerText = 'delete job'
    deleteJobBtn.classList.add('btn', 'create-bid', 'ml-3')
    deleteJobBtn.style = "background: rgb(120,194,173);"
    cardFooterA.append(deleteJobBtn)

    deleteJobBtn.addEventListener('click', event => {
        fetch(`http://localhost:3000/jobs/${job.id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    let alertDiv = document.createElement('div')
                    alertDiv.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show')
                    alertDiv.setAttribute('role', 'alert')
                    alertDiv.innerText = response.success
                    let dismissBtn = document.createElement('button')
                    dismissBtn.type = 'button'
                    dismissBtn.classList.add('close', 'mt-2')
                    dismissBtn.setAttribute('data-dismiss', 'alert')
                    dismissBtn.setAttribute('aria-label', 'Close')
                    dismissBtn.innerText = 'x'
                    let span = document.createElement('span')
                    span.setAttribute('data-hidden', 'true')
                    span.innerText = '&times;'
                    alertDiv.append(dismissBtn)
                    jobsBanner.append(alertDiv)
                }
                outerCard.innerHTML = ''
                outerCard.remove()
            })
    })

    createBidBtn.addEventListener('click', event => {
        // cardFooter.innerHTML = ''
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
        cardFooterB.append(bidForm)

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
                            cardBody.classList.add('card-body', 'input-parent')
                            cardBorder.append(cardBody)

                            let p = document.createElement('p')
                            p.setAttribute('id', 'update-this')
                            p.innerText = newBidObj.comment
                            cardBody.append(p)

                            let editBidButton = document.createElement('button')
                            editBidButton.type = 'click'
                            editBidButton.innerText = 'edit bid'
                            editBidButton.classList.add('btn', 'submit-bid', 'mt-2')
                            editBidButton.style = "background: rgb(120,194,173);"
                            cardBody.append(editBidButton)

                            formGroupA.remove()
                            bidForm.remove()

                            editBidButton.addEventListener('click', event => {
                                // cardBody.removeChild(editBidButton)
                                let updateBidForm = document.createElement('form')
                                let updateBidAmountLabel = document.createElement('label')
                                updateBidAmountLabel.classList.add('mr-3')
                                updateBidAmountLabel.setAttribute('for', 'edit-bid-amount')
                                updateBidAmountLabel.innerText = 'Bid Amount'
                                let updateBidAmountInput = document.createElement('input')
                                updateBidAmountInput.id = 'edit-bid-amount'
                                updateBidAmountInput.classList.add('form-control')
                                updateBidAmountInput.value = newBidObj.bid_amount
                                let updatePLabel = document.createElement('label')
                                updatePLabel.setAttribute('for', 'edit-bid-text')
                                updatePLabel.innerText = 'Comment'
                                let updateP = document.querySelector('#update-this')
                                let editText = document.createElement('textarea')
                                let saveBidButton = document.createElement('button')
                                saveBidButton.type = 'click'
                                saveBidButton.innerText = 'save bid'
                                saveBidButton.classList.add('btn', 'submit-bid', 'mt-2')
                                saveBidButton.style = "background: rgb(120,194,173);"
                                editText.classList.add('form-control')
                                editText.id = 'edit-bid-text'
                                editText.type = 'text'
                                editText.style = 'width: 300px; height: 200px'
                                editText.value = updateP.innerText
                                let formGroupEdit = document.createElement('form-group')
                                formGroupEdit.classList.add('form-group')
                                formGroupEdit.append(updateBidAmountLabel, updateBidAmountInput, updatePLabel, editText)
                                updateBidForm.append(formGroupEdit, saveBidButton)
                                cardBody.append(updateBidForm)
                                cardBody.removeChild(updateP)
                                editBidButton.style.display = 'none'

                                updateBidForm.addEventListener('submit', event => {
                                    event.preventDefault()
                                    let updateThisBid = newBidObj.id
                                    let newEditAmount = event.target['edit-bid-amount'].value
                                    let newComment = event.target['edit-bid-text'].value

                                    fetch('http://localhost:3000/bids', {
                                            method: 'PATCH',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Accept': 'applicaiton/json'
                                            },
                                            body: JSON.stringify({
                                                bid_id: updateThisBid,
                                                bid_amount: newEditAmount,
                                                comment: newComment
                                            })
                                        })
                                        .then(response => response.json())
                                        .then(updatedBidObj => {
                                            let oldCard = document.querySelector('div.input-parent')
                                            oldCard.parentNode.innerHTML = ''
                                            let cardBorder = document.createElement('div')
                                            cardBorder.classList.add('card', 'border-dark')
                                            outerCard.append(cardBorder)

                                            let cardHeader = document.createElement('div')
                                            cardHeader.classList.add('card-header', 'bg-secondary', 'text-light')
                                            cardHeader.innerText = 'Bid Amount: $' + updatedBidObj.bid_amount
                                            outerCard.append(cardBorder)
                                            cardBorder.append(cardHeader)

                                            let h5 = document.createElement('h5')
                                            h5.innerText = 'From: ' + updatedBidObj.contractor.business_name
                                            cardHeader.append(h5)

                                            let cardBody = document.createElement('div')
                                            cardBody.classList.add('card-body', 'input-parent')
                                            cardBorder.append(cardBody)

                                            let p = document.createElement('p')
                                            p.setAttribute('id', 'update-this')
                                            p.innerText = updatedBidObj.comment
                                            cardBody.append(p)

                                            editBidButton.style.display = ''
                                            cardBody.append(editBidButton)

                                        })

                                })

                            })
                        })
                })
        })

    })

    renderBids(job, outerCard)
}

