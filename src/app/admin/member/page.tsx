"use client";
import { FirebaseUtils, Member } from "@/utils/firebaseUtils";
import { useEffect, useState } from "react";
import EditIcon from "public/svg/edit.svg";
import DeleteIcon from "public/svg/delete.svg";
import { Modal } from "@/components/Modal";

export default function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    FirebaseUtils.getUsers().then((resp) => {
      setMembers(resp);
    });
  }, []);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-5">Manage Members</h1>
      {showModal && (
        <Modal
          title="Are you Sure to delete this Member?"
          acceptText="Delete Member"
          onAccept={() => {
            setShowModal(false);
          }}
          onCancel={() => {
            setShowModal(false);
          }}
        >
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this user? All of your data will be
            permanently removed. This action cannot be undone.
          </p>
        </Modal>
      )}

      <div className="flex flex-col gap-4">
        {members.map((m, idx) => (
          <div
            className="flex p-3 bg-slate-100 hover:bg-gray-50 gap-2.5 group rounded-lg items-center shadow-md"
            key={idx}
          >
            <span className="w-1/4 font-bold text-primary">{m.full_name}</span>
            <span className="w-1/6">{m.role}</span>
            <span className="grow font-mono">
              <span className="bg-green-50 px-2 py-1 rounded-full shadow-sm">
                {m.wallet_address}
              </span>
            </span>
            <span className="w-1/12 flex gap-2 justify-end">
              <button className="hover:shadow-md w-8 h-8 flex items-center justify-center rounded-lg text-primary bg-white">
                <EditIcon className="w-5 h-5" />
              </button>
              <button
                className="hover:shadow-md w-8 h-8 flex items-center justify-center rounded-lg text-red-600 bg-white"
                onClick={() => setShowModal(true)}
              >
                <DeleteIcon className="w-5 h-5" />
              </button>
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
