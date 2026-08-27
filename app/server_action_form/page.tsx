import PageShell from "../components/PageShell";
import UserForm from "./UserForm";
import { handleSubmit } from "./actions";

export default function Page() {
  return (
    <PageShell
      title="Server Action Form"
      description="Submit a name using a server action without a separate API route."
    >
      <UserForm submitAction={handleSubmit} />
    </PageShell>
  );
}
