const User =  require('../models/user');
const { validateBody, schemas } = require('../../helpers/routeHelpers');

module.exports = {
  signUpUser: async (req, res, next) => {
    const { username, password, email } = req.value.body;

    const foundUser = await User.findOne({email});  
    if(foundUser) return res.status(409).json({message: 'User already exist'})
    const newUser = new User({email, username})
    newUser.setPassword(password);
    await newUser.save()
    res.json({
      message: 'New user created',
      token: newUser.generateJwt()
    });
  },

  signInUser: async (req, res, next) => {
    const { username, password } = req.body;

    const foundUser = await User.findOne({username});
    
    if(foundUser && foundUser.validPassword(password)) {
      return res.json({
        message: 'Successfully loggged in',
        token: foundUser.generateJwt()
      })
    } else {
      res.status(401).json({
        message: 'Not authorized',
      })
    }
  }
}
