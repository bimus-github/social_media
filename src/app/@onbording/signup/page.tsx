"use client";

import RegistartionCard from "@/components/registrationCard";

function SignUp() {
  return (
    <RegistartionCard
      btnText="Create Accaunt"
      description="Create an account to enjoy all the services without any ads for free!"
      goTo="Login"
      goToMsg="Already Have An Account?"
      onClick={() => {}}
      title="Create An Account"
    />
  );
}

export default SignUp;
