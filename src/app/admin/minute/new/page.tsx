"use client";
import { useState } from "react";
import { FormInput, ListInput } from "../../components/formControl";
import { NFTMetadata } from "@/app/api/pin_file/route";

export default function AdminPage() {
  const [formData, setFormData] = useState<NFTMetadata>({
    file: "",
    address: "",
    metadata: {
      date: "",
      title: "",
      members: [],
      agenda: [],
      description: "",
      conclusion: "",
    },
  });

  return (
    <main className="mb-8">
      <h1 className="text-2xl font-bold">Add Minute</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormInput
          type="date"
          placeholder="date of meeting"
          label="Meeting Date"
          required
        />
        <FormInput
          type="text"
          placeholder="Gumba Sanitization"
          label="Meeting Title"
          required
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
        />
        <FormInput
          multiLines={true}
          type="text"
          placeholder="conclusion of the meeting"
          label="conclusion"
        />
        <button
          disabled={false}
          type="submit"
          className="bg-primary text-white font-bold px-4 py-2 rounded-lg hover:bg-slate-600 disabled:bg-slate-400"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
