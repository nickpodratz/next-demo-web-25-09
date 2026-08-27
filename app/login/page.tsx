import PageShell from "../components/PageShell";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <PageShell
      title="Login"
      description="Sign in to create blog posts and manage your profile."
    >
      <LoginForm />
    </PageShell>
  );
}
