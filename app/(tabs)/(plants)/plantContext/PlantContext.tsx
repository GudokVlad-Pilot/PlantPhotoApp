import React, { createContext, useState, useContext, ReactNode } from "react";

type Plant = {
  id: number;
  name: string;
  notes?: string;
  plantPicture?: string;
  addedAt: string;
};

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

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider = ({ children }: { children: ReactNode }) => {
  const [plants, setPlants] = useState<Plant[]>([]);

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
    <PlantContext.Provider value={{ plants, addPlant, updatePlant }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) throw new Error("PlantProvider should be used");
  return context;
};
