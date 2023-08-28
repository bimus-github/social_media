"use client";
import AccountCard from "@/components/accountCard";
import Modal from "@/components/modalForCard";
import { useAppSelector } from "@/strore/hooks";
import { User_Type } from "@/types";
import React, { useCallback, useEffect, useState } from "react";

function SearchUser({ params }: { params: { id: string } }) {
  const [searchedItems, setSearchedItems] = useState<User_Type[]>([]);
  const users = useAppSelector((state) => state.users);

  const search = useCallback(() => {
    const filtered = users.filter(
      (user) =>
        user.location.toLowerCase().includes(params.id) ||
        user.lastname.toLowerCase().includes(params.id) ||
        user.firstname.toLowerCase().includes(params.id) ||
        user.job.toLowerCase().includes(params.id)
    );

    setSearchedItems(filtered);
  }, [params.id, users]);

  useEffect(() => {
    search();
  }, [search]);
  return (
    <Modal>
      <div
        style={{
          //   overflowY: "auto",
          height: "600px",
          padding: "20px",
        }}
      >
        <AccountCard users={searchedItems} />
      </div>
    </Modal>
  );
}

export default SearchUser;
