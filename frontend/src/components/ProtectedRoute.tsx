import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthed } from "../utils/api";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const location = useLocation();
  if (!isAuthed()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
