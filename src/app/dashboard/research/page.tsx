"use client";
import MoleculeStructure from "../molecule-bank/Model";
import { useState } from "react";
import { Search } from "lucide-react";

export default function PubChem(){
  interface CompoundData {
    MolecularFormula: string;
    MolecularWeight: number;
    InChIKey: string;
    CanonicalSMILES: string;
    IsomericSMILES: string;
    IUPACName: string;
    XLogP: number;
    ExactMass: number;
    MonoisotopicMass: number;
    TPSA: number;
    Complexity: number;
    Charge: number;
    HBondDonorCount: number;
    HBondAcceptorCount: number;
    RotatableBondCount: number;
    HeavyAtomCount: number;
  }

  const [compoundName, setCompoundName] = useState("");
  const [compoundData, setCompoundData] = useState<CompoundData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCompoundData = async () => {
    setLoading(true);
    setError("");
    setCompoundData(null);

    try {
      const response = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(
          compoundName,
        )}/property/MolecularFormula,MolecularWeight,InChIKey,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,HeavyAtomCount/JSON`,
      );

      if (!response.ok) {
        throw new Error("Compound not found. We sincerely apologize, but we couldn't locate the compound you are searching for. For example, you may try searching for 'aspirin' or 'ethanol' to get started.");

      }

      const data = await response.json();

      if (
        data &&
        data.PropertyTable &&
        data.PropertyTable.Properties &&
        data.PropertyTable.Properties.length > 0
      ) {
        const compoundInfo = data.PropertyTable.Properties[0];
        setCompoundData({
          MolecularFormula: compoundInfo.MolecularFormula,
          MolecularWeight: compoundInfo.MolecularWeight,
          InChIKey: compoundInfo.InChIKey,
          CanonicalSMILES: compoundInfo.CanonicalSMILES,
          IsomericSMILES: compoundInfo.IsomericSMILES,
          IUPACName: compoundInfo.IUPACName,
          XLogP: compoundInfo.XLogP,
          ExactMass: compoundInfo.ExactMass,
          MonoisotopicMass: compoundInfo.MonoisotopicMass,
          TPSA: compoundInfo.TPSA,
          Complexity: compoundInfo.Complexity,
          Charge: compoundInfo.Charge,
          HBondDonorCount: compoundInfo.HBondDonorCount,
          HBondAcceptorCount: compoundInfo.HBondAcceptorCount,
          RotatableBondCount: compoundInfo.RotatableBondCount,
          HeavyAtomCount: compoundInfo.HeavyAtomCount,
        });
      } else {
        throw new Error("Compound data is not available");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchCompoundData();
    }
  };

  return (
    <div className="container mx-auto min-h-screen bg-transparent p-8 text-white">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-5xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-purple-500">
          Compound Search{" "}🧪
        </h2>
        <div className="relative mt-4 w-full max-w-md">
          <input
            type="text"
            value={compoundName}
            onChange={(e) => setCompoundName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-full bg-white bg-opacity-20 font-default p-4 pl-12 text-lg text-purple-500 placeholder-gray-700 shadow-lg outline-none focus:ring-4 focus:ring-blue-600 hover:bg-opacity-30 transition-all duration-300"
            placeholder="Enter a compound name"
          />
          <span className="absolute inset-y-0 left-4 flex items-center">
            <Search className="text-white opacity-60 hover:opacity-100 transition-opacity duration-200" />
          </span>
        </div>
      </div>

      {error && (
        <p className="mt-36 text-3xl font-semibold text-red-500">{error}</p>
      )}

      {compoundData && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 p-6 shadow-2xl">
            <h2 className="mb-4 text-3xl font-bold">Basic Information</h2>
            <p className="mb-2">
              <span className="font-semibold">Molecular Formula:</span>{" "}
              {compoundData.MolecularFormula}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Molecular Weight:</span>{" "}
              {compoundData.MolecularWeight} g/mol
            </p>
            <p className="mb-2">
              <span className="font-semibold">InChIKey:</span>{" "}
              {compoundData.InChIKey}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Canonical SMILES:</span>{" "}
              <MoleculeStructure
                id={`${compoundData.CanonicalSMILES}`}
                structure={compoundData.CanonicalSMILES}
              />
            </p>
            <p className="mb-2">
              <span className="font-semibold">Isomeric SMILES:</span>{" "}
              {compoundData.IsomericSMILES}
            </p>
            <p className="mb-2">
              <span className="font-semibold">IUPAC Name:</span>{" "}
              {compoundData.IUPACName}
            </p>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-emerald-700 to-green-300 p-6 shadow-2xl">
            <h2 className="mb-4 text-3xl font-bold">Physical Properties</h2>
            <p className="mb-2">
              <span className="font-semibold">XLogP:</span> {compoundData.XLogP}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Exact Mass:</span>{" "}
              {compoundData.ExactMass} g/mol
            </p>
            <p className="mb-2">
              <span className="font-semibold">Monoisotopic Mass:</span>{" "}
              {compoundData.MonoisotopicMass} g/mol
            </p>
            <p className="mb-2">
              <span className="font-semibold">TPSA:</span> {compoundData.TPSA} Å²
            </p>
            <p className="mb-2">
              <span className="font-semibold">Complexity:</span>{" "}
              {compoundData.Complexity}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Charge:</span>{" "}
              {compoundData.Charge}
            </p>
          </div>

          <div className="col-span-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-300 p-6 shadow-2xl">
            <h2 className="mb-4 text-3xl font-bold">Additional Information</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <p className="mb-2">
                <span className="font-semibold">Hydrogen Bond Donors:</span>{" "}
                {compoundData.HBondDonorCount}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Hydrogen Bond Acceptors:</span>{" "}
                {compoundData.HBondAcceptorCount}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Rotatable Bonds:</span>{" "}
                {compoundData.RotatableBondCount}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Heavy Atom Count:</span>{" "}
                {compoundData.HeavyAtomCount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
