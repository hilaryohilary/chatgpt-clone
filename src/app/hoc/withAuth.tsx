// hoc/withAuth.js
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";


export default function withAuth(Component) {
  return function ProtectedRoute() {
    const router = useRouter();
    const userAuthenticated = localStorage.getItem('token');

    const [userCredentials] = useAuthState(auth);
    
    useEffect(() => {
      if (!userAuthenticated) {
          router.push("/auth");
      } 
    }, [userAuthenticated, router]);

    return <Component/>;
  };
}
