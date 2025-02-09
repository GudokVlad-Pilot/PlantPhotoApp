import React, { createContext, useState, useContext, ReactNode } from "react";

// Plant properties
type Plant = {
  id: number;
  name: string;
  notes?: string;
  plantPicture?: string;
  addedAt: string;
};

// Context properties
type PlantContextType = {
  plants: Plant[];
  addPlant: (name: string, notes?: string, plantPicture?: string) => void;
  updatePlant: (
    id: number,
    name: string,
    notes?: string,
    plantPicture?: string
  ) => void;
};

// PlantContext as a const
const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider = ({ children }: { children: ReactNode }) => {
  // Setting the plants
  const [plants, setPlants] = useState<Plant[]>([]);

  // Adding a new plant
  const addPlant = (name: string, notes?: string, plantPicture?: string) => {
    const newPlant: Plant = {
      id: plants.length + 1,
      name,
      notes,
      plantPicture,
      addedAt: new Date().toISOString(),
    };
    setPlants([...plants, newPlant]);
  };

  // Updating the existing plant
  const updatePlant = (
    id: number,
    name: string,
    notes?: string,
    plantPicture?: string
  ) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, name, notes, plantPicture } : plant
      )
    );
  };

  return (
    // Setting the context to be used in other files
    <PlantContext.Provider value={{ plants, addPlant, updatePlant }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  // Requiring to use PlantProvider for the context
  const context = useContext(PlantContext);
  if (!context) throw new Error("PlantProvider should be used");
  return context;
};
