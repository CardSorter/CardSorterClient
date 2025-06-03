import {useSelector} from "react-redux";
import StateSchema from "../reducers/StateSchema";
import {useEffect} from "react";
import {usePathname, useRouter} from "i18n/navigation";

export default function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  // State
  const authToken = useSelector((state: StateSchema) => state.auth.token);

  // Redirect in case the token has been set to undefined
  useEffect(() => {
    console.log('🔍 Current pathname:', pathname); // ✅ Add this
  
    const isPublicRoute =
      pathname === '/' ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/register');
  
    if (!authToken && !isPublicRoute) {
      router.push('/login');
    }
  
    if (authToken && isPublicRoute) {
      router.push('/dashboard');
    }
  }, [authToken, pathname, router]);
  

  return <></>;

}