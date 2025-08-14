import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { ENV } from "../config/env";

export interface AuthRequest extends Request {
  auth?: {
    user: {
      id: string;
    };
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.auth = { user: { id: session.user.id } };
    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const email = req.headers["x-admin-email"];
  const secret = req.headers["x-admin-secret"];

  if (email !== ENV.ADMIN_EMAIL || secret !== ENV.ADMIN_SECRET) {
    return res.status(403).json({ error: "Forbidden - Invalid credentials" });
  }
  next();
};
