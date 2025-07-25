import clsx from "clsx";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ScrollView } from "@/screens/components/ui/scroll-view";

interface TabsContextProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

// --- Tabs container ---
export const Tabs: FC<{
  defaultIndex?: number;
  children: ReactNode;
  className?: string;
}> & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Panel: typeof TabsPanel;
} = ({ defaultIndex = 0, children, className }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <View className={className}>{children}</View>
    </TabsContext.Provider>
  );
};

// --- Tabs.List ---
const TabsList: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <View className={clsx("mb-3 flex-row justify-around", className)}>{children}</View>;
};

// --- Tabs.Trigger ---
const TabsTrigger: FC<{
  index: number;
  children: ReactNode;
  className?: string;
  textClassName?: string;
}> = ({ index, children, className = "", textClassName = "" }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside <Tabs />");

  const { activeIndex, setActiveIndex } = context;
  const isActive = activeIndex === index;

  const baseClass = "px-4 py-2 border-b-2";
  const activeClass = isActive ? "border-cyan-500" : "border-transparent";

  const textBase = "text-base text-gray-600";
  const textActive = isActive ? "text-cyan-500 font-bold" : "";

  return (
    <TouchableOpacity
      onPress={() => setActiveIndex(index)}
      className={clsx(baseClass, activeClass, className)}
    >
      <Text className={clsx(textBase, textActive, textClassName)}>{children}</Text>
    </TouchableOpacity>
  );
};

// --- Tabs.Panel ---
const TabsPanel: FC<{
  index: number;
  children: ReactNode;
  className?: string;
}> = ({ index, children, className }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsPanel must be used inside <Tabs />");

  const { activeIndex } = context;

  if (activeIndex !== index) return null;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      className={clsx("rounded-lg p-4", className)}
    >
      {children}
    </ScrollView>
  );
};

// Subcomponentes
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Panel = TabsPanel;

export default Tabs;
