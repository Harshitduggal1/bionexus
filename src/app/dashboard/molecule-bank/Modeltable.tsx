"use client";
import React, { useState, useEffect } from "react";
import MoleculeStructure from "./Model";

const moleculeBank = [
  {
    moleculeName: "Aspirin",
    smilesStructure: "CC(=O)OC1=CC=CC=C1C(O)=O",
    molecularWeight: 180.16,
    categoryUsage: "Pain reliever/NSAID",
  },
  {
    moleculeName: "Caffeine",
    smilesStructure: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
    molecularWeight: 194.19,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Benzene",
    smilesStructure: "C1=CC=CC=C1",
    molecularWeight: 78.11,
    categoryUsage: "Industrial solvent",
  },
  {
    moleculeName: "Glucose",
    smilesStructure: "C(C1C(C(C(C(O1)O)O)O)O)O",
    molecularWeight: 180.16,
    categoryUsage: "Energy source/sugar",
  },
  {
    moleculeName: "Penicillin",
    smilesStructure: "CC1(C2C(C(C(O2)N1C(=O)COC(=O)C)C)S)C=O",
    molecularWeight: 334.39,
    categoryUsage: "Antibiotic",
  },
  {
    moleculeName: "Ibuprofen",
    smilesStructure: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    molecularWeight: 206.28,
    categoryUsage: "Pain reliever/NSAID",
  },
  {
    moleculeName: "Acetaminophen",
    smilesStructure: "CC(=O)NC1=CC=C(O)C=C1",
    molecularWeight: 151.16,
    categoryUsage: "Pain reliever/Antipyretic",
  },
  {
    moleculeName: "Morphine",
    smilesStructure: "CN1CCC23C4C1CC(C2C3O)OC5=CC=CC=C45",
    molecularWeight: 285.34,
    categoryUsage: "Pain reliever/Opiate",
  },
  {
    moleculeName: "Nicotine",
    smilesStructure: "CN1CCCC1C2=CN=CC=C2",
    molecularWeight: 162.23,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Ethanol",
    smilesStructure: "CCO",
    molecularWeight: 46.07,
    categoryUsage: "Alcohol/Disinfectant",
  },
];

const TableOne = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMolecules, setFilteredMolecules] = useState(moleculeBank);

  useEffect(() => {
    const filteredData = moleculeBank.filter((molecule) =>
      molecule.moleculeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredMolecules(filteredData);
  }, [searchQuery]);

  return (
    <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 px-8 py-10 shadow-2xl dark:border-gray-800 dark:from-gray-900 dark:to-black sm:px-12 xl:px-16">
      <h4 className="mb-8 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Molecules
      </h4>

      <input
        type="search"
        placeholder="Search molecule"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-full border-2 border-gray-300 bg-white px-6 py-4 text-lg shadow-inner transition-all duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-200"
      />
      <div className="mt-10 flex flex-col">
        <div className="grid grid-cols-3 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 p-4 dark:from-blue-900 dark:to-purple-900 sm:grid-cols-4">
          <div className="p-3 xl:p-5">
            <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 sm:text-base">
              Molecule name
            </h5>
          </div>
          <div className="p-3 text-center xl:p-5">
            <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 sm:text-base">
              Smile Structure Image
            </h5>
          </div>
          <div className="p-3 text-center xl:p-5">
            <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 sm:text-base">
              Molecular Weights (g/mol)
            </h5>
          </div>
          <div className="hidden p-3 text-center sm:block xl:p-5">
            <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 sm:text-base">
              Category Usage
            </h5>
          </div>
        </div>

        {filteredMolecules.map((molecule, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === filteredMolecules.length - 1
                ? ""
                : "border-b border-gray-200 dark:border-gray-700"
            } hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200`}
            key={key}
          >
            <div className="flex items-center justify-center p-4 xl:p-6">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {molecule.moleculeName}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 xl:p-6">
              <div className="flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
                <MoleculeStructure
                  id={`${key}`}
                  structure={molecule.smilesStructure}
                />
              </div>
            </div>

            <div className="hidden items-center justify-center p-4 sm:flex xl:p-6">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {molecule.molecularWeight}
              </p>
            </div>

            <div className="hidden items-center justify-center p-4 sm:flex xl:p-6">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {molecule.categoryUsage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;