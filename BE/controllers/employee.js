const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.body.id;
  //remove user from table
  employee.splice(employee.findIndex((user) => user.id === id), 1);
  return res.status(200).json({ message: 'Deleted Successfully' });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const name = req.body.name;
  const id = req.body.id;
  for(i = 0; i < employee.length; i++)
  {
    if (employee[i].id === id)
    {
      return res.status(100).json( {message : "ID already exists"});
    }
  }
  employee.push( { id : id , name : name} );
  console.log('Recieved data: ', name, id)
  res.status(200);
 
};
