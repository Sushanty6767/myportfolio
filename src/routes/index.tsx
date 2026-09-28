import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sushant Chaturvedi — AI/ML Engineer & Developer" },
      { name: "description", content: "Portfolio of Sushant Chaturvedi, a Computer Science and AI/ML student building intelligent software and practical machine learning applications." },
      { property: "og:title", content: "Sushant Chaturvedi — AI/ML Engineer & Developer" },
      { property: "og:description", content: "Selected AI, machine learning, and software engineering work by Sushant Chaturvedi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <Portfolio />;
}
