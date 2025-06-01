import jwt from "jsonwebtoken";

// This middleware is used for protected routes, it checks if the user is authenticated or not
async function authMiddleware(req, res, next) {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, please login!",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
}

// This middleware is used for public routes, it checks if the user is authenticated or not, if not then it passes userId as null
async function authPublicMiddleware(req, res, next) {
  const { token } = req.headers;

  try {
    // If the user is not authenticated then pass userId as null
    if (!token) {
      req.body.userId = null;
    } else {
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = tokenDecode.id;
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
}

export { authMiddleware, authPublicMiddleware };
