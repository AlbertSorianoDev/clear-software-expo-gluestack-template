import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Task } from "../types/task";

const initialState = {
  id: -1,
  name: "",
  userId: 0,
  clientId: 0,
  columnId: 0,
  budgetInMinutes: 0,
  notes: "",
  order: 0,
  images: [],
  files: [],
};

interface TaskStore {
  id: number;
  name: string;
  userId: number;
  clientId: number;
  columnId: number;
  budgetInMinutes: number;
  notes: string;
  order: number;
  images: { name: string; uri: string }[];
  files: { name: string; uri: string }[];
  setName: (name: string) => void;
  setUserId: (userId: number) => void;
  setClientId: (clientId: number) => void;
  setColumnId: (columnId: number) => void;
  setOrder: (order: number) => void;
  setBudgetInMinutes: (budget: number) => void;
  setNotes: (notes: string) => void;
  setFromGetTaskQuery: (task: Task) => void;
  reset: () => void;
}

export const useTaskStore = create<TaskStore>()(
  immer((set) => ({
    ...initialState,
    setName: (name) =>
      set((state) => {
        state.name = name;
      }),
    setUserId: (userId) =>
      set((state) => {
        state.userId = userId;
      }),
    setNotes: (notes) =>
      set((state) => {
        state.notes = notes;
      }),
    setBudgetInMinutes: (budget) =>
      set((state) => {
        state.budgetInMinutes = budget;
      }),
    setColumnId: (columnId) =>
      set((state) => {
        state.columnId = columnId;
      }),
    setOrder: (order) =>
      set((state) => {
        state.order = order;
      }),
    setClientId(clientId) {
      set((state) => {
        state.clientId = clientId;
      });
    },
    setFromGetTaskQuery: (task) =>
      set((state) => {
        state.id = task.id;
        state.columnId = task.columnId;
        state.name = task.name;
        state.userId = task.assignedUserId;
        state.clientId = task.assignedClientId;
        state.notes = task.notes;
        state.order = task.order;
        state.budgetInMinutes = task.budgetInMinutes;
        state.files = task.files;
        state.images = task.images;
      }),
    reset: () =>
      set((state) => {
        Object.assign(state, initialState);
      }),
  })),
);
