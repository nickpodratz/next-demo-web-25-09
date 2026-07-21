import { Suspense } from "react";
import UserSearchForm from "./UserSearchForm";

export default function Page() {

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <UserSearchForm />
        </Suspense>
    )
}