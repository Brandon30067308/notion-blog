"use client";

import { Breadcrumb } from "flowbite-react";

export default function BlogBreadCrumb({
  postTitle,
  postLink,
}: {
  postTitle: string;
  postLink: string;
}) {
  return (
    <Breadcrumb className="[&_li>svg]:w-5 [&_li>svg]:h-5 [&_li>svg]:text-gray-700">
      <Breadcrumb.Item href="/blog" className="text-sm">
        <span>
          <svg
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] h-[17px] mr-2"
          >
            <path
              d="M17.0991 7.9107L15.4304 6.24401L9.58991 0.410617C9.43345 0.25439 9.22126 0.166626 9.00002 0.166626C8.77878 0.166626 8.5666 0.25439 8.41013 0.410617L2.56962 6.24401L0.900901 7.9107C0.748916 8.06787 0.664818 8.27837 0.666719 8.49687C0.66862 8.71537 0.756368 8.92438 0.911065 9.07889C1.06576 9.2334 1.27503 9.32104 1.4938 9.32294C1.71256 9.32484 1.92332 9.24084 2.08068 9.08904L2.32515 8.84487V15.1666C2.32515 15.6086 2.50096 16.0326 2.81391 16.3451C3.12685 16.6577 3.5513 16.8333 3.99387 16.8333H6.49695C6.71823 16.8333 6.93045 16.7455 7.08693 16.5892C7.2434 16.4329 7.3313 16.221 7.3313 16V12.6666C7.3313 12.4456 7.41921 12.2336 7.57568 12.0773C7.73215 11.921 7.94438 11.8332 8.16566 11.8332H9.83438C10.0557 11.8332 10.2679 11.921 10.4244 12.0773C10.5808 12.2336 10.6687 12.4456 10.6687 12.6666V16C10.6687 16.221 10.7566 16.4329 10.9131 16.5892C11.0696 16.7455 11.2818 16.8333 11.5031 16.8333H14.0062C14.4487 16.8333 14.8732 16.6577 15.1861 16.3451C15.4991 16.0326 15.6749 15.6086 15.6749 15.1666V8.84487L15.9194 9.08904C16.0767 9.24084 16.2875 9.32484 16.5062 9.32294C16.725 9.32104 16.9343 9.2334 17.089 9.07889C17.2437 8.92438 17.3314 8.71537 17.3333 8.49687C17.3352 8.27837 17.2511 8.06787 17.0991 7.9107Z"
              fill="currentColor"
            />
          </svg>
        </span>
        Blog
      </Breadcrumb.Item>
      <Breadcrumb.Item href={postLink} className="text-sm">
        {postTitle}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
