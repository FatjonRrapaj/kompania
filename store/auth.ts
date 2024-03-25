import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";
import { User } from "firebase/auth";

import { callLogin } from "@/api/auth";
