"use client";

// import "@/styles/login/index.css";
import RegistartionCard from "@/components/registrationCard";

function Login() {
  const onClick = () => {};
  return (
    <RegistartionCard
      btnText="Open App"
      description="Create your account to enjoy all the services without any ads for free!"
      goTo="Sign Up"
      goToMsg="If you don't have an account?"
      onClick={onClick}
      title="Create Your Account"
    />
  );
}

export default Login;
