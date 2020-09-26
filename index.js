fetch('http://localhost:3000/jobs')
.then(response => response.json())
.then(console.log)