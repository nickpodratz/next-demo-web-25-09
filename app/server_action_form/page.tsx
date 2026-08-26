import UserForm from "./UserForm";
import { handleSubmit } from "./actions";

export default function Page() {
  return (
    <section>
      <UserForm submitAction={handleSubmit} />
    </section>
  );
}
