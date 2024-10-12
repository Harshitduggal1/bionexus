"use client";
import React, { useState } from "react";

interface ComponentHeaderProps {
  pageName: string;
  containActionButton?: boolean;
}

interface FormData {
  smilesString: string;
  numberOfMolecules: string;
  minimumSimilarity: string;
  particles: string;
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  pageName,
  containActionButton,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    smilesString: "",
    numberOfMolecules: "",
    minimumSimilarity: "",
    particles: "",
  });

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    closeModal();
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
        {pageName}
      </h2>

      {containActionButton && (
        <nav>
          <ol className="flex items-center gap-2">
            <li
              onClick={openModal}
              className="cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-teal-500 hover:shadow-xl"
            >
              Add Molecule
            </li>
          </ol>
        </nav>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Add New Molecule</h3>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SMILES String</label>
                  <input
                    name="smilesString"
                    value={formData.smilesString}
                    onChange={handleInputChange}
                    placeholder="Enter SMILES string"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Molecules</label>
                  <input
                    name="numberOfMolecules"
                    value={formData.numberOfMolecules}
                    onChange={handleInputChange}
                    placeholder="Enter number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Similarity</label>
                <input
                  name="minimumSimilarity"
                  value={formData.minimumSimilarity}
                  onChange={handleInputChange}
                  placeholder="Enter minimum similarity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Particles</label>
                <input
                  name="particles"
                  value={formData.particles}
                  onChange={handleInputChange}
                  placeholder="Enter particles"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                Add molecule
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentHeader;
