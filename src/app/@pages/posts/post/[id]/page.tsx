import Modal from "@/components/modalForCard";
import React from "react";

function CurrentPost({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <div>{params.id}</div>
    </Modal>
  );
}

export default CurrentPost;
