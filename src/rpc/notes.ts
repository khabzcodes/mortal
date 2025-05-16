import { baseRpcUrl } from "@/rpc/config";
import { CreateNoteInputValidation } from "@/validations/notes";

const route = baseRpcUrl.notes;

export const getUserNotes = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch notes");
  }

  const { data } = await response.json();

  return data;
};

export const createNote = async (note: CreateNoteInputValidation) => {
  const response = await route.$post({ json: note });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create note");
  }

  const { data } = await response.json();

  return data;
};
