import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="z-50">
      <SignIn />
    </div>
  );
}
