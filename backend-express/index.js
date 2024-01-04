import express from "express";
import cors from "cors";
import mysql from "mysql";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "university",
});

app.get("/getData", (req, res) => {
  res.send("Student management system");
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ Message: "Unauthorized: You need to login" });
  } else {
    jwt.verify(token, "nabilshartajkhan", (error, data) => {
      if (error) {
        return res
          .status(401)
          .json({ Message: "Unauthorized: Authentication failure" });
      } else {
        req.id = data.id;
        req.name = data.name;
        req.role = data.role;
        next();
      }
    });
  }
};

app.get("/list", verifyUser, (req, res) => {
  const sql = "SELECT * FROM students_list";
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  });
});

app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO `students_list`(`name`, `department`, `phone_no`, `city`, `gender`) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.name,
    req.body.dept,
    req.body.num,
    req.body.city,
    req.body.gender,
  ];

  db.query(sql, values, (e, data) => {
    if (e) {
      return res.json(e);
    }
    return res.json("Information added successfully!");
  });
});

app.get("/student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students_list WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE `students_list` SET `name`=?, `department`=?, `phone_no`=?, `city`=?, `gender`=? WHERE id=?";
  const id = req.params.id;

  const values = [
    req.body.name,
    req.body.dept,
    req.body.num,
    req.body.city,
    req.body.gender,
    id,
  ];

  db.query(sql, values, (e, data) => {
    if (e) {
      return res.json(e);
    }
    return res.json("Updated!");
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE from `students_list` WHERE id=?";
  const id = req.params.id;

  db.query(sql, [id], (e, data) => {
    if (e) {
      return res.json(e);
    }
    return res.json("Deleted!");
  });
});

app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO `login`(`name`, `email`, `password`, `gender`) VALUES (?,?,?,?)";
  const { name, email, password, gender } = req.body;

  const values = [name, email, password, gender];

  db.query(sql, values, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        return res.status(500).json({ error: "Internal server error" });
      }
    }
    return res.status(200).json({ message: "Signup successful!", data: data });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login where `email`=? AND `password`=? ";

  db.query(sql, [req.body.email, req.body.password], (error, data) => {
    if (error) {
      return res.json("Error");
    }
    console.log("Data:", data);
    if (data.length > 0) {
      const id = data[0].id;
      const name = data[0].name;
      const role = data[0].role;
      console.log("Role:", role);
      const token = jwt.sign({ id, name, role }, "nabilshartajkhan", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ status: "success", name, role, id });
    } else {
      return res.json({ message: "No data found" });
    }
  });
});

app.get("/home", verifyUser, (req, res) => {
  return res.json({ status: "success", role: req.role, name: req.name });
});

app.get("/logout", verifyUser, (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ status: "success" });
});

app.get("/profile", verifyUser, (req, res) => {
  const id = req.id;
  const sql = "SELECT * FROM login WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  });
});

app.put("/profile/update", verifyUser, (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.id;

  const sql = `UPDATE login SET name=?, email=?, password=? WHERE id=?`;

  db.query(sql, [name, email, password, userId], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    return res.status(200).json({ message: "Profile updated successfully" });
  });
});

app.get("/courses", verifyUser, (req, res) => {
  const sql = "SELECT * FROM course";
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  });
});

app.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM course WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.put("/cor_update/:id", (req, res) => {
  const sql =
    "UPDATE  `course` SET `name`=?, `description`=?, `faculty`=?, `room`=? WHERE id=?";

  const id = req.params.id;

  const values = [
    req.body.name,
    req.body.desc,
    req.body.fac,
    req.body.room,
    id,
  ];

  db.query(sql, values, (e, data) => {
    if (e) {
      return res.json(e);
    }
    return res.json("Updated!");
  });
});

app.post("/create_course", (req, res) => {
  const sql =
    "INSERT INTO `course` (`name`, `description`, `faculty`, `room`) VALUES (?, ?, ?, ?)";

  const values = [req.body.name, req.body.desc, req.body.fac, req.body.room];

  db.query(sql, values, (e, data) => {
    if (e) {
      return res.json(e);
    }
    return res.json({ message: "Information added successfully!" });
  });
});

app.delete("/deletecourse/:id", (req, res) => {
  const sql = "DELETE from `course` WHERE id=?";
  const id = req.params.id;

  db.query(sql, [id], (e, data) => {
    if (e) {
      return res.json(e);
    }
    return res.json("Deleted!");
  });
});

app.get("/view", verifyUser, (req, res) => {
  const sql = "SELECT * FROM course";
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  });
});

app.get("/details/:id", verifyUser, (req, res) => {
  const courseId = req.params.id;
  const sql = "SELECT * FROM course WHERE id = ?";

  db.query(sql, [courseId], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(200).json(result[0]);
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  });
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/update/:id/upload", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const image = req.file.filename;
  const sql = "UPDATE `students_list` SET `image`=? WHERE `id`=?";
  db.query(sql, [image, id], (err, result) => {
    if (err) {
      return res.json({ status: "error", message: "Failed to update image" });
    }
    return res.json({
      status: "success",
      message: "Image updated successfully",
    });
  });
});

app.post("/enrollments/book", verifyUser, (req, res) => {
  const { student_id, course_id } = req.body;

  const courseCountQuery = `
    SELECT COUNT(*) as enrolledCoursesCount 
    FROM enrollments 
    WHERE student_id = ?`;

  db.query(courseCountQuery, [student_id], (error, countResult) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const totalCourseCount = countResult[0].enrolledCoursesCount || 0;
    const maxCourse = 4;

    if (totalCourseCount >= maxCourse) {
      return res
        .status(400)
        .json({
          message: "You have reached the maximum limit of enrolled courses",
        });
    }

    const sql = `
      INSERT INTO enrollments (student_id, course_id, enrollment_date) 
      VALUES (?, ?, NOW())`;

    db.query(sql, [student_id, course_id], (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: "Enrollment successful" });
      } else {
        return res.status(400).json({ message: "Enrollment failed" });
      }
    });
  });
});

app.get("/enrollments/user/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql =
    "SELECT * FROM enrollments JOIN course ON enrollments.course_id = course.id WHERE enrollments.student_id = ?";

  db.query(sql, [userId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(5000, () => console.log("App is running in port 5000!"));
