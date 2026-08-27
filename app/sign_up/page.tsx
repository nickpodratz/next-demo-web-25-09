import PageShell from "../components/PageShell";
import SignUpForm from "./SignUpForm";

export default function Page() {
  return (
    <PageShell
      title="Sign up"
      description="Create an account to join the demo and publish blog posts."
    >
      <SignUpForm />
    </PageShell>
  );
}
