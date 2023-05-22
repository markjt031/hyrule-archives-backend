const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.status(401).json({message: "Not authorized"})
    }
  }

module.exports=isAuthenticated