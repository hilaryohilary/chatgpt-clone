// hoc/withAuth.js
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function withAuth(Component) {
  return function ProtectedRoute() {
    const router = useRouter();

    
    useEffect(() => {
      const userAuthenticated = localStorage.getItem("token");
      if (!userAuthenticated) {
          router.push("/auth");
      } 
    }, [ router]);

    return <Component/>;
  };
}
