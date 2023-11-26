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
    <main>
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
        />
        <FormInput
          type="text"
          placeholder="Gumba Sanitization"
          label="Meeting Title"
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
        <button type="submit" className="bg-primary text-white font-bold">
          Submit
        </button>
      </form>
    </main>
  );
}
