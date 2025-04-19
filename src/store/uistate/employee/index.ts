// store/userStore.js
import { create } from "zustand";

interface EmployeeState {
  employee: any; // Replace `any` with a specific type if you know the structure of `employee`
  setEmployee: (userData: any) => void; // Replace `any` with a specific type if you know the structure of `userData`
  visible:boolean; // Add the `visible` state, 
  setVisible: (visible: boolean) => void; // Add the `visible` state and its setter function 
  employeeId: number; // Add the `employeeId` state
  setEmployeeId: (id: number) => void; // Setter function for `employeeId`
  activeTab: string; // Add the `activeTab` state
  setActiveTab: (tab: string) => void; // Setter function for `activeTab`
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employee: null,
  setEmployee: (userData) => set({ employee: userData }),
  visible: false, // Initialize `visible` to false
  setVisible: (visible) => set({ visible }), // Setter function for `visible`
  employeeId: 0, // Initialize `employeeId` to 0 or any default value you prefer
  setEmployeeId: (id) => set({ employeeId: id }), // Setter function for `employeeId`
  activeTab: '1', // Initialize `activeTab` to '1' or any default value you prefer  
  setActiveTab: (tab) => set({ activeTab: tab }), // Setter function for `activeTab`
}));
