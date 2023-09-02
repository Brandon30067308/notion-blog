"use client";

import { BlogPost } from "@/types/schema";
import { flowbiteTheme } from "@/utils";
import Button from "./Button";
import { Card, Flowbite } from "flowbite-react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostCard({
  blogPost,
}: {
  blogPost: BlogPost & { excerpt: string };
}) {
  const { cover, title, excerpt, tags, slug } = blogPost;
  const blogPostLink = `/blog/${slug.toLowerCase()}`;

  return (
    <Flowbite theme={{ theme: flowbiteTheme }}>
      <Card
        imgAlt={title}
        className="w-full [&>div]:px-0 [&>div]:justify-start [&>div]:py-0 [&>div]:gap-4 overflow-hidden"
      >
        <Image
          src={cover}
          alt={title}
          width={300}
          height={300}
          className="w-full h-52 object-cover"
        />
        <div className="flex flex-col px-4">
          <div className="sm:min-h-[24px] flex flex-wrap gap-2 mb-3">
            {(tags ?? []).map((tag, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray-100 font-medium capitalize text-xs rounded-md px-2 py-1 shadow-sm"
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
          <div className="w-full flex flex-col justify-between self-stretch mb-8">
            <div className="mb-3">
              <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                {title}
              </h5>
              <div className="text-base font-normal text-gray-500">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {excerpt}
                </ReactMarkdown>
              </div>
            </div>
            <Link href={blogPostLink}>
              <Button color="primary" outline>
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </Flowbite>
  );
}
