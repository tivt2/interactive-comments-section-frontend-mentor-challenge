"use client";

import { CommentsSection } from "@/components/comments/CommentsSection";
import { LocalStorageProvider } from "@/components/comments/contexts/LocalStorageContext";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "react-query";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col items-center px-4 py-8 resp:py-16 resp:px-0 bg-base-200">
      <LocalStorageProvider>
        <QueryClientProvider client={queryClient}>
          <CommentsSection />
        </QueryClientProvider>
      </LocalStorageProvider>
      <p className=" mt-4 text-center w-full max-w-xl">
        Project using render.com free server, if loading please wait server to
        wake up, in the mean time visit the{" "}
        <a
          className=" font-medium text-primaryBlue"
          href="https://github.com/tivt2/interactive-comments-section-frontend-mentor-challenge"
        >
          project repo
        </a>
        .
      </p>
    </main>
  );
}
