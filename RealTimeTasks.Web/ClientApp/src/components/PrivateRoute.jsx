import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function PrivateRoute({ children }) {
    return useUser().user ? children : <Navigate to='/login' replace />;
}