"use client";
import Breadcrumb from "./Headerm";
import MoleculeStructure from "../molecule-bank/Model"; // Import MoleculeStructure
import React, { useState, useEffect } from "react";
import {
  createMoleculeGenerationHistory,
  getMoleculeGenerationHistoryByUser,
} from "@/lib/actions/molecule-generation.action";

const ModalLayout = () => {
  const [smiles, setSmiles] = useState(
    "CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C"
  );
  const [numMolecules, setNumMolecules] = useState("10");
  const [minSimilarity, setMinSimilarity] = useState("0.3");
  const [particles, setParticles] = useState("30");
  const [iterations, setIterations] = useState("10");
  const [molecules, setMolecules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const API_KEY =
      "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";

    const invokeUrl =
      "https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate";

    const payload = {
      algorithm: "CMA-ES",
      num_molecules: parseInt(numMolecules),
      property_name: "QED",
      minimize: false,
      min_similarity: parseFloat(minSimilarity),
      particles: parseInt(particles),
      iterations: parseInt(iterations),
      smi: smiles,
    };

    try {
      const response = await fetch(invokeUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const generatedMolecules = JSON.parse(data.molecules).map((mol: any) => ({
        structure: mol.sample,
        score: mol.score,
      }));

      setMolecules(generatedMolecules);

      if (userId) {
        await createMoleculeGenerationHistory({
          smiles,
          numMolecules: parseInt(numMolecules),
          minSimilarity: parseFloat(minSimilarity),
          particles: parseInt(particles),
          iterations: parseInt(iterations),
          generatedMolecules,
        });

        const updatedHistory = await getMoleculeGenerationHistoryByUser();
        setHistory(updatedHistory);
      } else {
        console.error("User ID is not available.");
      }

      console.log(generatedMolecules);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Breadcrumb pageName="Generate Molecules" />

      <div className="gap-9 grid grid-cols-1 sm:grid-cols-3">
        <div className="flex flex-col gap-9 sm:col-span-2">
          <div className="border-stroke dark:border-[#121212] bg-white dark:bg-[#181818] shadow-xl hover:shadow-2xl border rounded-lg transition-transform duration-500 hover:scale-105">
            <div className="border-stroke dark:border-strokedark bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6.5 py-4 border-b rounded-t-lg text-white">
              <h3 className="font-bold text-center text-lg uppercase tracking-wider">
                SMILES to Molecule Generator
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 p-6.5">
                <div className="flex xl:flex-row flex-col gap-6">
                  <div className="w-full xl:w-1/2">
                    <label className="block mb-3 font-medium text-gray-800 text-sm dark:text-gray-300">
                      SMILES String
                    </label>
                    <input
                      type="text"
                      value={smiles}
                      onChange={(e) => setSmiles(e.target.value)}
                      placeholder="Enter SMILES string"
                      className="border-[1.5px] border-gray-300 focus:border-indigo-600 dark:border-gray-2 bg-gray-50 dark:bg-[#181818] px-5 py-3 rounded-lg focus:ring-2 focus:ring-indigo-200 w-full text-black dark:text-white transition outline-none"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="block mb-3 font-medium text-gray-800 text-sm dark:text-gray-300">
                      Number of Molecules
                    </label>
                    <input
                      type="text"
                      value={numMolecules}
                      onChange={(e) => setNumMolecules(e.target.value)}
                      placeholder="Enter number of molecules"
                      className="border-[1.5px] border-gray-300 focus:border-indigo-600 dark:border-gray-2 bg-gray-50 dark:bg-[#181818] px-5 py-3 rounded-lg focus:ring-2 focus:ring-indigo-200 w-full text-black dark:text-white transition outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-gray-800 text-sm dark:text-gray-300">
                      Minimum Similarity
                    </label>
                    <input
                      type="text"
                      value={minSimilarity}
                      onChange={(e) => setMinSimilarity(e.target.value)}
                      placeholder="Enter minimum similarity"
                      className="border-[1.5px] border-gray-300 focus:border-indigo-600 dark:border-gray-2 bg-gray-50 dark:bg-[#181818] px-5 py-3 rounded-lg focus:ring-2 focus:ring-indigo-200 w-full text-black dark:text-white transition outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-800 text-sm dark:text-gray-300">
                      Particles
                    </label>
                    <input
                      type="text"
                      value={particles}
                      onChange={(e) => setParticles(e.target.value)}
                      placeholder="Enter number of particles"
                      className="border-[1.5px] border-gray-300 focus:border-indigo-600 dark:border-gray-2 bg-gray-50 dark:bg-[#181818] px-5 py-3 rounded-lg focus:ring-2 focus:ring-indigo-200 w-full text-black dark:text-white transition outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-800 text-sm dark:text-gray-300">
                      Iterations
                    </label>
                    <input
                      type="text"
                      value={iterations}
                      onChange={(e) => setIterations(e.target.value)}
                      placeholder="Enter number of iterations"
                      className="border-[1.5px] border-gray-300 focus:border-indigo-600 dark:border-gray-2 bg-gray-50 dark:bg-[#181818] px-5 py-3 rounded-lg focus:ring-2 focus:ring-indigo-200 w-full text-black dark:text-white transition outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:bg-opacity-80 shadow-lg p-3 rounded-lg w-full font-medium text-white transform transition duration-300 hover:scale-105"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Molecules"}
                </button>
              </div>
            </form>
          </div>

          {/* Render the MoleculeStructure component */}
          <div className="mt-6">
            {molecules.length > 0 && (
              <MoleculeStructure molecules={molecules} />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="border-stroke dark:border-[#121212] bg-gradient-to-r from-pink-300 to-purple-400 shadow-xl hover:shadow-2xl p-3 border rounded-lg transition-transform duration-500 hover:scale-105">
            <h3 className="font-bold text-center text-white uppercase">
              Molecule Generation History
            </h3>
            <div className="mt-4 max-h-72 overflow-y-auto">
              {history.length > 0 ? (
                history.map((entry: { smiles: string; generatedMolecules: any[]; createdAt: string }, index: number) => (
                  <div key={index} className="bg-white mb-2 p-2 rounded">
                    <p>SMILES: {entry.smiles}</p>
                    <p>Molecules: {entry.generatedMolecules.length}</p>
                    <p>Time: {entry.createdAt}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No history available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
