import clsx from "clsx";
import { Text, View } from "react-native";

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = "Open up the code for this screen:";
  const description =
    "Change any of the text, save the file, and your app will automatically update.";

  return (
    <View>
      <View className={styles.getStartedContainer}>
        <Text className={styles.getStartedText}>{title}</Text>
        <View className={clsx(styles.codeHighlightContainer, styles.homeScreenFilename)}>
          <Text>{path}</Text>
        </View>
        <Text className={styles.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: clsx("rounded-md px-1"),
  getStartedContainer: clsx("mx-12 items-center"),
  getStartedText: clsx("text-center text-lg leading-6"),
  homeScreenFilename: clsx("my-2"),
};
