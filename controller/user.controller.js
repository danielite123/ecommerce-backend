import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const formatDatatoSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );
  return {
    access_token,
    profile_img: user.profile_img,
    username: user.username,
    role: user.role,
  };
};

export const registerAdmin = async (req, res) => {
  let { username, email, password, role = "admin" } = req.body;

  if (username.length < 3) {
    return res
      .status(403)
      .json({ error: "username must be at least 3 letters" });
  }

  if (!email.length) {
    return re.status(403).json({ error: "Enter Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }

  if (password < 8) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 character long with a numeric, 1 lowercase and 1 uppercase letter",
    });
  }

  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(403).json({ error: "Email already registered" });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let user = User({
      username,
      email,
      password: hashed_password,
      role,
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDatatoSend(u));
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  });
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({
          errors: {
            email: "User does not exist",
          },
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(403).json({
            errors: {
              server: "Error occurred while logging in",
            },
          });
        }

        if (!result) {
          return res.status(403).json({
            errors: {
              password: "Incorrect password",
            },
          });
        } else {
          return res.status(200).json(formatDatatoSend(user));
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({
        errors: {
          server: err.message,
        },
      });
    });
};
