"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validators_1 = require("./validators");
const zod_1 = require("zod");
const auth_1 = __importDefault(require("./middlewares/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv.config();
//middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
//signout endpoint
app.post("/logout", (req, res) => {
    console.log("first line of logout");
    try {
        res.clearCookie("token").json({ message: "Log out successful" });
        // localStorage.clear();
    }
    catch (error) {
        console.error("Log out failed:", error);
        res.status(500).json({ error: "Log out failed, try again" });
    }
});
//Register enpdoint
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, surname, email, password } = validators_1.registerSchema.parse(req.body);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log(hashedPassword);
        const newUser = yield db_1.default.query("INSERT INTO public.users (is_admin, name, surname, password, email) VALUES($1, $2, $3, $4, $5) RETURNING id", [false, name, surname, hashedPassword, email]);
        console.log("buraya geliyo");
        const userId = newUser.rows[0].id;
        const token = jsonwebtoken_1.default.sign({ userId }, hashedPassword, {
            expiresIn: "9h", // Token expiration time
        });
        res.json({ token });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ message: "Registration failed" });
    }
}));
//insert survey object  into database
app.post("/survey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.dataSent);
    try {
        const { id, owner_id, creation_date, deadline, description, participants, title, questions, } = validators_1.insertSurveySchema.parse(req.body.dataSent);
        const newSurvey = yield db_1.default.query("INSERT INTO public.surveys (id, owner_id, title, description, creation_date, deadline, participants) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id", [id, owner_id, title, description, creation_date, deadline, participants]);
        for (let i = 0; i < questions.length; i++) {
            yield db_1.default.query("INSERT INTO public.questions (id, survey_id, question, question_type, choices) VALUES($1, $2, $3, $4, $5)", [
                questions[i].id,
                questions[i].survey_id,
                questions[i].question,
                questions[i].question_type,
                questions[i].choices,
            ]);
        }
        res
            .status(200)
            .json({ message: "Survey and questions inserted into their tables" });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            console.log("hocam şimdi de zod tipinde hata var");
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: "Ups.. Something went wrong!" });
    }
}));
//Login enpdoint
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.default.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (!user.rows[0]) {
            return res.status(401).json({ error: "User not found" });
        }
        const valid = yield bcrypt_1.default.compare(password, user.rows[0].password);
        if (!valid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ user: user.rows[0] }, process.env.JWT_SECRET, {
            expiresIn: "8h", // Token expiration time
        });
        res
            .cookie("token", token, { secure: true, httpOnly: false })
            .json({ message: "Login successful" });
    }
    catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ error: "Login failed" });
    }
}));
// app.get("/currentuser/:id", async (req: Request, res: Response) => {
//   const userid = req.params.id;
//   console.log(`userid: ${userid}`);
//   try {
//     const user = await dbpool.query("SELECT * FROM users WHERE id = $1", [
//       userid,
//     ]);
//     res.json(user.rows[0]);
//   } catch (error) {
//     console.log("get user failed:", error);
//     res.status(500).json({ error: "Get user failed" });
//   }
// });
app.get("/surveys/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const surveyid = req.params.id;
    console.log(`surveyid: ${surveyid}`);
    try {
        const survey = yield db_1.default.query("SELECT * FROM surveys WHERE id= $1", [
            surveyid,
        ]);
        console.log("e burası başarılı oldu");
        console.log("survey.rows=>", survey.rows);
        res.json(survey.rows);
    }
    catch (error) {
        console.log("get user failed:", error);
        res.status(500).json({ error: "Get user failed" });
    }
}));
app.get("/mySurveys", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    try {
        const mySurveys = yield db_1.default.query("SELECT * FROM surveys WHERE owner_id = $1 LIMIT 6", [id]);
        res.json(mySurveys.rows);
    }
    catch (error) {
        console.log("get user failed:", error);
        res.status(500).json({ error: "Get user failed" });
    }
}));
app.get("/currentuser", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    console.log("usermi=> ", req.body.user.id);
    try {
        const userQuery = yield db_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
        if (!userQuery.rows[0]) {
            return res.status(401).json({ error: "User not found" });
        }
        console.log(userQuery.rows[0]);
        const user = userQuery.rows[0];
        const _partipatedSurveys = user.participated_surveys;
        console.log("participated_surveys=>", _partipatedSurveys);
        let participatedSurveys = [];
        for (let i = 0; i < _partipatedSurveys.length; i++) {
            const surveyQuery = yield db_1.default.query("SELECT * FROM surveys WHERE id = $1", [_partipatedSurveys[i]]);
            const surveyOwnerQuery = yield db_1.default.query("SELECT * FROM users WHERE id = $1", [surveyQuery.rows[0].owner_id]);
            const survey = Object.assign(Object.assign({}, surveyQuery.rows[0]), { owner: {
                    name: surveyOwnerQuery.rows[0].name,
                    surname: surveyOwnerQuery.rows[0].surname,
                } });
            participatedSurveys.push(survey);
        }
        res.status(200).json({ user, participatedSurveys });
    }
    catch (error) {
        console.log("get user failed:", error);
        res.status(500).json({ error: "Get user failed" });
    }
}));
app.delete("/removeuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Kullanıcıyı veritabanından silin
    const userid = req.body.id;
    try {
        const ok = yield db_1.default.query("DELETE FROM users WHERE id = $1", [userid]);
    }
    catch (error) {
        console.log("delete failed:", error);
    }
    res.json({ message: "User deleted" });
}));
app.get("/profile", auth_1.default, (req, res) => {
    // Kullanıcının profilini döndürün veya işlem yapın
    const { payload } = req.body;
    console.log(payload === null || payload === void 0 ? void 0 : payload.user);
    res.json({ user: payload });
});
app.listen(5000, () => {
    console.log("listening on port 5000");
});
