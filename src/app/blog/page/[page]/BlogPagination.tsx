"use client";

import { flowbiteTheme } from "@/utils";
import { Flowbite, Pagination } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function BlogPagniation({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  return (
    <Flowbite theme={{ theme: flowbiteTheme }}>
      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => {
          router.push(`/blog/page/${page}`);
        }}
        totalPages={totalPages}
      />
    </Flowbite>
  );
}
