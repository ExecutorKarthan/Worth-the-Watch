//Create a function to require the user to be logged in for full site functionality 
const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };

//Export the function for use
module.exports = withAuth;  