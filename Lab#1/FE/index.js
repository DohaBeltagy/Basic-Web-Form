function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const SubBtn = document.getElementById('employeeForm')
SubBtn.addEventListener('submit', createEmployee)


// TODO
// add event listener to delete button
const table = document.querySelector('.table');
const  rows = table.getElementsByTagName('tr'); 
table.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-danger')) {
      // Find the parent row of the clicked button
      const row = event.target.closest('tr');
      
      // Get the ID from the first cell of the row
      const id = row.cells[0].textContent;
      
      deleteEmployee(id);
      
  }
});

// TODO

function createEmployee (){
  // get data from input field
  const nameInput  = document.getElementById('name') 
  const idInput = document.getElementById('id')
  const name = nameInput.value;
  const id = idInput.value;
  // verifications
if(id < 0)
  return alert("Please enter a valid employee ID")
else{
  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method:'POST',
    headers:{  
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({name: name, id: id})
  })
  .then(response => {
    console.log("hello1");
    if(response.status === 100)
    {
      return alert(response.message);
    }
    else if(response.status === 200)
    {
      console.log("hello");
      return response.json();
    }
  })
}
  // call fetchEmployees
  console.log("hello2");
  fetchEmployees();
}


// TODO
function deleteEmployee (id){
  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`,{
  method:"DELETE",
  headers:{ 
    'Content-Type' : 'application/json'
  },
  body:JSON.stringify({id : id})
})
.then(() => {
  fetchEmployees();
}) }

fetchEmployees();
