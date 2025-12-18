const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  // Validate name
  const nameRegex = /^[a-zA-Z. ]+$/;
  if(!nameRegex.test(name)) return res.status(400).send("Name is not valid");
  
  // Validate email
  
  // Validate password
};

export { register };