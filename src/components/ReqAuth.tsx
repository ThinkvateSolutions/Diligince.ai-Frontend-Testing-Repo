// // src/components/RequireAuth.tsx
// import { useEffect } from "react";
// import { useAuth } from "@/components/AuthContext";
// import { useNavigate } from "react-router-dom";

// const RequireAuth = ({ children }: { children: React.ReactNode }) => {
//   const { user, loading } = useAuth();
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/signin");
//     }
//   }, [user, loading, navigate]);

//   if (loading) return <div>Loading...</div>;

//   return <>{user ? children : null}</>;
// };

// export default RequireAuth;



// src/components/RequireAuth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const user = true;      // Pretend user is logged in by default
  const loading = false;  // Not loading by default

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return <>{user ? children : null}</>;
};

export default RequireAuth;
