"use client";

import AccountCard from "@/components/accountCard";
import { useAppSelector } from "@/strore/hooks";

function Users() {
  const users = useAppSelector((state) => state.users);
  return (
    <div className="users-main-div width-full column a-i-c padding-20px gap-40px">
      <AccountCard users={users} />
    </div>
  );
}

export default Users;
