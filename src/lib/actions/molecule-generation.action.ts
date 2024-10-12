"use server";

import MoleculeGenerationHistory from "../models";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import mongoose from "mongoose";

export async function createMoleculeGenerationHistory(
  payload: MoleculeGenerationHistoryType
) {
  try {
    await connectToDatabase();

    const newHistoryEntry = await MoleculeGenerationHistory.create({
      ...payload,
    });

    return JSON.parse(JSON.stringify(newHistoryEntry));
  } catch (error) {
    console.error("Error creating history entry:", error);
    handleError(error);
  }
}

export async function getMoleculeGenerationHistoryByUser() {
  try {
    await connectToDatabase();

    const historyEntries = await MoleculeGenerationHistory.find({})
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(historyEntries));
  } catch (error) {
    console.error("Error retrieving history entries:", error);
    handleError(error);
  }
}

export async function getMoleculeGenerationHistoryById(historyId: string) {
  try {
    await connectToDatabase();

    const historyEntry = await MoleculeGenerationHistory.findById(historyId);
    if (!historyEntry) throw new Error("History entry not found");

    return JSON.parse(JSON.stringify(historyEntry));
  } catch (error) {
    console.error("Error retrieving history entry by ID:", error);
    handleError(error);
  }
}

export async function deleteMoleculeGenerationHistory(entryId: string) {
  try {
    await connectToDatabase();

    const deletedEntry =
      await MoleculeGenerationHistory.findByIdAndDelete(entryId);

    return JSON.parse(JSON.stringify(deletedEntry));
  } catch (error) {
    console.error("Error deleting history entry:", error);
    handleError(error);
  }
}
