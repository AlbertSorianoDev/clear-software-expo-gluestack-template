import { Client } from "../types/client";
import { Column } from "../types/column";
import { Task } from "../types/task";
import { User } from "../types/user";
import { WorkSession } from "../types/work-session";

export const users: User[] = [
  {
    id: 1,
    name: "Employee 1",
    avatarUrl: "https://avatar.iran.liara.run/public/6",
  },
  {
    id: 2,
    name: "Employee 2",
    avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
  },
];

export const clients: Client[] = [
  {
    id: 1,
    name: "Client 1",
    company: "Client 1 company",
  },
  {
    id: 2,
    name: "Client 2",
    company: "Client 2 company",
  },
];

export const columns: Column[] = [
  { id: 1, name: "Column 1" },
  { id: 2, name: "Column 2" },
  { id: 3, name: "Column 3" },
  { id: 4, name: "Column 4" },
  { id: 5, name: "Column 5" },
];

export const tasks: Task[] = [
  {
    id: 1,
    columnId: 1,
    name: "Task 1",
    assignedUserId: 1,
    assignedClientId: 1,
    budgetInMinutes: 250,
    order: 1,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [
      {
        name: "image-1",
        uri: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
      },
      {
        name: "image-1",
        uri: "https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg",
      },
    ],
    files: [
      {
        name: "charmeleon_pic.jpg",
        uri: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
      },
      {
        name: "owl_pic.jpg",
        uri: "https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg",
      },
    ],
  },
  {
    id: 2,
    columnId: 1,
    name: "Task 2",
    assignedUserId: 1,
    assignedClientId: 2,
    budgetInMinutes: 10,
    order: 2,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [],
    files: [],
  },
  {
    id: 3,
    columnId: 2,
    name: "Task 3",
    assignedUserId: 0,
    assignedClientId: 2,
    budgetInMinutes: 10,
    order: 1,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [],
    files: [],
  },
  {
    id: 4,
    columnId: 2,
    name: "Task 4",
    assignedUserId: 1,
    assignedClientId: 0,
    budgetInMinutes: 10,
    order: 2,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [],
    files: [],
  },
  {
    id: 5,
    columnId: 3,
    name: "Task 5",
    assignedUserId: 2,
    assignedClientId: 1,
    budgetInMinutes: 10,
    order: 1,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [],
    files: [],
  },
  {
    id: 6,
    columnId: 3,
    name: "Task 6",
    assignedUserId: 2,
    assignedClientId: 1,
    budgetInMinutes: 10,
    order: 2,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [],
    files: [],
  },
  {
    id: 7,
    columnId: 3,
    name: "Task 7",
    assignedUserId: 2,
    assignedClientId: 1,
    budgetInMinutes: 10,
    order: 3,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [],
    files: [],
  },
  {
    id: 8,
    columnId: 4,
    name: "Task 8",
    assignedUserId: 1,
    assignedClientId: 0,
    budgetInMinutes: 10,
    order: 1,
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lectus risus, et feugiat augue pharetra non. Suspendisse dictum, purus ut sodales tempus, tellus neque tincidunt nisl, at egestas elit arcu a nulla. Duis augue nulla, venenatis nec dignissim nec, pharetra a elit. Suspendisse ac sodales nunc. Proin eget tempor dolor. Donec quis ligula volutpat, semper purus ut, rutrum lectus. Nunc auctor neque eget dignissim posuere.",
    images: [],
    files: [],
  },
];

export const workSessions: WorkSession[] = [
  {
    id: 1,
    taskId: 1,
    startTime: new Date(1751581925058),
    endTime: new Date(1751589125058),
    userId: 1,
    invoiceId: undefined,
    userPaymentId: 1,
  },
  {
    id: 2,
    taskId: 1,
    startTime: new Date(1751581925058),
    endTime: new Date(1751589125058),
    userId: 1,
    invoiceId: undefined,
    userPaymentId: 1,
  },
];
