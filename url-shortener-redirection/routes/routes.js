import { Router } from "express";
import healthController from "../controllers/health.js";
import authController from "../controllers/auth.js";
import privacyController from "../controllers/privacy.js";
import isAuth from "../middlewares/isAuth.js";
import createShortUrl from "../controllers/urls/shorten.js";
import listUrls from "../controllers/urls/list.js";
import viewUrl from "../controllers/urls/view.js";
import deleteUrl from "../controllers/urls/delete.js";
import updateUrl from "../controllers/urls/update.js";
import redirectUrl from "../controllers/urls/redirection.js";
import analytics from "../controllers/urls/analytics.js";
import generateCsv from "../controllers/urls/csv.js";

const router = Router();

router.get("/", healthController.getHealth);
router.post("/", healthController.postHealth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/public", privacyController.publicPath);
router.get("/private", isAuth, privacyController.privatePath);

//Url shortener & redirection routes
router.post("/urls", isAuth, createShortUrl);
router.get("/urls", isAuth, listUrls);
router.get("/urls/:id", isAuth, viewUrl);
router.put("/urls/:id", isAuth, updateUrl);
router.delete("/urls/:id", isAuth, deleteUrl);
router.get("/:shortUrl", redirectUrl);
router.get("/urls/:id/analytics", isAuth, analytics);

//Generate csv route
router.get("/urls/:id/report", isAuth, generateCsv);

export default router;