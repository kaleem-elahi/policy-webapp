"use client";

import { Header } from "./components/Header";
import { PolicyList } from "./components/policy-list/PolicyList";

export default function Home() {
  return (
    <>
      <Header />
      <PolicyList policies={[{}, {}]} />
    </>
  );
}
