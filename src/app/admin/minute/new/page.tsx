"use client";
import { useEffect, useState } from "react";
import { FormInput, ListInput } from "../../components/formControl";
import { NFTMetadata } from "@/app/api/pin_file/route";
import { useAccount, useSignMessage } from "wagmi";
import { randomBytes } from "ethers";
import axios from "axios";
import { signMessage } from "viem";

type PinFileData = {
  file: string;
  address: `0x${string}`;
  metadata: {
    date: string;
    title: string;
    members: string[];
    agenda: string[];
    description: string;
    conclusion: string;
  };
};

export default function AdminPage() {
  const { isConnected, address } = useAccount();
  const [formData, setFormData] = useState<PinFileData>({
    file: "",
    address: "0x00",
    metadata: {
      date: "",
      title: "",
      members: [],
      agenda: [],
      description: "",
      conclusion: "",
    },
  });
  const { data: signedMessage, signMessage } = useSignMessage({
    onSuccess: (data, variables) => {
      axios
        .post("/api/pin_file", {
          ...formData,
          crypto: {
            message: variables.message,
            signature: data,
          },
        })
        .then((resp) => {
          return;
        });
    },
  });
  useEffect(() => {
    if (address) {
      setFormData({ ...formData, address });
    }
  }, [address]);

  return (
    <main className="mb-8">
      <h1 className="text-2xl font-bold">Add Minute</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          signMessage({
            message: Buffer.from(randomBytes(32)).toString("hex"),
          });
        }}
      >
        <FormInput
          type="date"
          placeholder="date of meeting"
          label="Meeting Date"
          required
          value={formData.metadata.date}
          onChange={(e) => {
            setFormData({
              ...formData,
              metadata: { ...formData.metadata, date: e.target.value },
            });
          }}
        />
        <FormInput
          type="text"
          placeholder="Gumba Sanitization"
          label="Meeting Title"
          required
          value={formData.metadata.title}
          onChange={(e) => {
            setFormData({
              ...formData,
              metadata: { ...formData.metadata, title: e.target.value },
            });
          }}
        />
        <ListInput
          inline
          label="Members"
          values={formData.metadata.members}
          onChange={(v) => {
            setFormData({
              ...formData,
              metadata: { ...formData.metadata, members: v },
            });
          }}
          placeholder="Enter to add a member"
        />
        <ListInput
          label="Agendas"
          values={formData.metadata.agenda}
          onChange={(v) => {
            setFormData({
              ...formData,
              metadata: { ...formData.metadata, agenda: v },
            });
          }}
          placeholder="Enter to add new agenda"
        />
        <FormInput
          multiLines={true}
          type="text"
          placeholder="Enter Description Here ..."
          label="Meeting Description"
          required
          value={formData.metadata.description}
          onChange={(e) => {
            setFormData({
              ...formData,
              metadata: { ...formData.metadata, description: e.target.value },
            });
          }}
        />
        <FormInput
          multiLines={true}
          type="text"
          placeholder="conclusion of the meeting"
          label="conclusion"
          required
          value={formData.metadata.conclusion}
          onChange={(e) => {
            setFormData({
              ...formData,
              metadata: { ...formData.metadata, conclusion: e.target.value },
            });
          }}
        />
        <FormInput
          className="file:text-error file:border-none file:h-full py-0 pl-0 file:p-1 file:px-4"
          required
          type="file"
          label="File"
          accept="image/*"
          onChange={(e) => {
            // @ts-ignore
            let file: File = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (typeof reader.result === "string") {
                  setFormData({ ...formData, file: reader.result });
                }
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {<div>Signature: {signedMessage}</div>}
        <button
          disabled={!isConnected}
          type="submit"
          className="bg-primary text-white font-bold px-4 py-2 rounded-lg hover:bg-slate-600 disabled:bg-slate-400"
        >
          Sign message and Submit
        </button>
      </form>
    </main>
  );
}
