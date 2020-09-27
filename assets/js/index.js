const cardContainer = document.querySelector('div.row.cards')
const homeOwnerBtn = document.querySelector('button.btn.homeowner')
const form = document.querySelector('form')

fetch('http://localhost:3000/jobs')
    .then(response => response.json())
    .then(jobsArray => {
        jobsArray.forEach(job => {
            turnJobIntoCard(job)
        })
    })

// const handleCreateUser = (username) => {
//     fetch('')
// }   

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
    descriptionText.style = 'width: 300px'
    descriptionText.classList.add('form-control')

    let submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.classList.add('btn', 'btn-primary', 'mb-2')
    submitBtn.innerText = 'submit'

    formGroupA.append(usernameLabel, usernameInput)
    formGroupB.append(zipcodeLabel, zipcodeInput)
    formGroupC.append(descriptionLabel, descriptionText)
    form.innerHTML = ''
    form.append(formGroupA, formGroupB, formGroupC, submitBtn)

    form.addEventListener('submit', event => {
        event.preventDefault()

        let username = event.target.username.value
        let zipcode = event.target.zipcode.value
        let jobDescription = event.target['description-text'].value


        
    })
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

    let cardFooter = document.createElement('div')
    cardFooter.classList.add('d-flex', 'card-footer')
    cardBorder.append(cardFooter)

    cardContainer.append(outerCard)
    renderBids(job, outerCard)
}
