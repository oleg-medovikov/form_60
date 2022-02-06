import { useContext } from "react";

import { AppErrorContext } from "@providers/AppErrorProvider";

export const useAppError = () => useContext(AppErrorContext)