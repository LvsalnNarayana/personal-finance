import { Stack } from "@mui/material";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../Utils/SupabaseClient";
const SigninForm = () => {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack width={300}>
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#00308F",
                  brandAccent: "#00308F",
                },
              },
            },
          }}
          view="sign_in"
          showLinks={false}
        />
      </Stack>
    </Stack>
  );
};

export default SigninForm;

