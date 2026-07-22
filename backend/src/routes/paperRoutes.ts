import { Router } from "express";
import { generate, download, getStatus, listUserPapers, statusStream } from "../controllers/paperController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

/** POST /api/paper/generate */
router.post("/generate", authenticate, generate);

/** GET /api/paper/status/stream/:sessionId */
router.get("/status/stream/:sessionId", authenticate, statusStream);

/** GET /api/paper/status/:sessionId */
router.get("/status/:sessionId", authenticate, getStatus);

/** GET /api/paper/list */
router.get("/list", authenticate, listUserPapers);

/** GET /api/paper/:sessionId/download?format=pdf|docx|tex */
router.get("/:sessionId/download", authenticate, download);

export default router;
