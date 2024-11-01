import { Header } from "./components/Header";
import { PolicyList } from "./components/policy-list/PolicyList";

export default function Home() {
  return (
    <>
      <Header />

      <PolicyList
        policies={[
          {
            id: "1",
            title: "Policy 1",
            description: "Description 1",
            topic: "Topic 1",
            status: "active",
            location: "",
            dateIntroduced: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Policy 2",
            description: "Description 2",
            topic: "Topic 2",
            status: "active",
            location: "",
            dateIntroduced: new Date().toISOString(),
          },
        ]}
      />
    </>
  );
}
