"use client";

import { AuthContextType } from "@/utils/types";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);