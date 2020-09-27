const cardContainer = document.querySelector('div.row')

fetch('http://localhost:3000/jobs')
    .then(response => response.json())
    .then(jobsArray => {
        jobsArray.forEach(job => {
            turnJobIntoCard(job)
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