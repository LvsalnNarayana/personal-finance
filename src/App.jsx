import { useState, useEffect } from "react";
import SigninForm from "./Components/SigninForm";
import { supabase } from "./Utils/SupabaseClient";
import ExpenseData from "./ExpenseData";
import "./App.css";

export default function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <SigninForm />;
  } else {
    return <ExpenseData/>;
  }
}

