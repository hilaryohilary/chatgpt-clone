// hoc/withAuth.js
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";


export default function withAuth(Component) {
  return function ProtectedRoute() {
    const router = useRouter();
    const pathName = usePathname();


    const [userCredentials] = useAuthState(auth);
    
    useEffect(() => {

      if (!userCredentials) {
          router.replace(`/auth?next=${pathName}`);
      } else {
        router.replace(`${pathName}`);
      }
    }, [userCredentials, router]);

    return <Component/>;
  };
}
