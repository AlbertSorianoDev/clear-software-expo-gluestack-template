import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { columns, tasks, workSessions } from "../data/initial_data";
import { Column } from "../types/column";
import { Task } from "../types/task";
import { WorkSession } from "../types/work-session";

const initialState = {
  currentTaskId: -1,
  assignedUserFilter: 0,
  searchValueFilter: "",
  showTaskDrawer: false,
  showTimeUpModal: false,
  showDeleteTaskConfirmationModal: false,
  showImageModal: false,
  currentImageUri: "",
  columns,
  tasks,
  workSessions,
};

interface KanbanBoardPageStore {
  assignedUserFilter: number;
  searchValueFilter: string;
  showTaskDrawer: boolean;
  currentTaskId: number;
  showTimeUpModal: boolean;
  showDeleteTaskConfirmationModal: boolean;
  showImageModal: boolean;
  currentImageUri: string;
  columns: Column[];
  tasks: Task[];
  workSessions: WorkSession[];
  toggleShowTaskDrawer: () => void;
  setShowTimeUpModal: (show: boolean) => void;
  setCurrentTaskId: (id: number) => void;
  setShowDeleteTaskConfirmationModal: (show: boolean) => void;
  setAssignedUserFilter: (assignedUser: number) => void;
  setSearchValueFilter: (searchValue: string) => void;
  setShowImageModal: (visible: boolean) => void;
  setCurrentImageUri: (uri: string) => void;
  addColumn: () => void;
  editColumnName: (taskId: number, name: string) => void;
  addTask: (columnId: number) => number;
  editTaskName: (taskId: number, name: string) => void;
  editTaskUserAssigned: (taskId: number, userId: number) => void;
  editTaskClientAssigned: (taskId: number, clientId: number) => void;
  editBudgetInMinutes: (taskId: number, budget: number) => void;
  editTaskNotes: (taskId: number, notes: string) => void;
  addWorkSession: (taskId: number) => void;
  stopWorkSession: (wsId: number) => void;
}

export const useKanbanBoardPageStore = create<KanbanBoardPageStore>()(
  immer((set, get) => ({
    ...initialState,

    toggleShowTaskDrawer: () => set((state) => ({ showTaskDrawer: !state.showTaskDrawer })),

    setShowTimeUpModal: (show) => set(() => ({ showTimeUpModal: show })),

    setCurrentTaskId: (id) => set(() => ({ currentTaskId: id })),

    setShowDeleteTaskConfirmationModal: (show) =>
      set(() => ({ showDeleteTaskConfirmationModal: show })),

    setAssignedUserFilter: (assignedUser) => set(() => ({ assignedUserFilter: assignedUser })),

    setSearchValueFilter: (searchValue) => set(() => ({ searchValueFilter: searchValue })),

    setShowImageModal: (visible) => set(() => ({ showImageModal: visible })),

    setCurrentImageUri: (uri) => set(() => ({ currentImageUri: uri })),

    addColumn: () =>
      set((state) => {
        const newId = Math.max(0, ...state.columns.map((c) => c.id)) + 1;
        state.columns.push({ id: newId, name: "New column" });
      }),

    editColumnName: (columnId, name) =>
      set((state) => {
        const column = state.columns.find((c) => c.id === columnId);
        if (column) column.name = name;
      }),

    addTask: (columnId) => {
      const newId = Math.max(0, ...get().tasks.map((t) => t.id)) + 1;
      const newTask: Task = {
        id: newId,
        name: "",
        columnId,
        assignedUserId: 0,
        assignedClientId: 0,
        budgetInMinutes: 0,
        order: get().tasks.filter((t) => t.columnId === columnId).length + 1,
        notes: "",
        images: [],
        files: [],
      };
      set((state) => {
        state.tasks.push(newTask);
      });
      return newId;
    },

    editTaskName: (taskId, name) =>
      set((state) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) task.name = name;
      }),

    editTaskUserAssigned: (taskId, userId) =>
      set((state) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) task.assignedUserId = userId;
      }),

    editTaskClientAssigned: (taskId, clientId) =>
      set((state) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) task.assignedClientId = clientId;
      }),

    editBudgetInMinutes: (taskId, budget) =>
      set((state) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) task.budgetInMinutes = budget;
      }),

    editTaskNotes: (taskId, notes) =>
      set((state) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) task.notes = notes;
      }),

    addWorkSession: (taskId) =>
      set((state) => {
        const newId = Math.max(0, ...state.workSessions.map((ws) => ws.id)) + 1;
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task) return;

        const newWorkSession: WorkSession = {
          id: newId,
          taskId,
          startTime: new Date(),
          endTime: undefined,
          userId: task.assignedUserId,
          invoiceId: undefined,
          userPaymentId: undefined,
        };
        state.workSessions.push(newWorkSession);
      }),

    stopWorkSession: (wsId) =>
      set((state) => {
        const workSession = state.workSessions.find((ws) => ws.id === wsId);
        if (workSession) workSession.endTime = new Date();
      }),
  })),
);
