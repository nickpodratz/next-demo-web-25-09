import UserForm from "./UserForm";
import { handleSubmit } from "./actions";

export default function Page() {
  return (
    <main>
      <UserForm submitAction={handleSubmit} />
    </main>
  );
}
