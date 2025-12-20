import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { CoursesHeader } from "../../../ui/pages/courses/components/CoursesHeader";

export default function CoursesScreen() {
  return (
    <SafeAreaView bg="primary" flex>
      <CoursesHeader />
      <ScrollView bg="primary">
      </ScrollView>
    </SafeAreaView>
  );
}

