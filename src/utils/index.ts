import { CustomFlowbiteTheme } from "flowbite-react";

export const flowbiteTheme: CustomFlowbiteTheme = {
  button: {
    base: "min-h-[42px] font-medium transition-colors outline-none",
    outline: {
      color: {
        primary:
          "group border border-blue-700 [&>span]:text-blue-700 bg-transparent [&>span]:bg-transparent hover:bg-blue-700/90 hover:text-white focus:ring-2 focus:ring-blue-700/40 transition-colors",
        secondary:
          "group border border-gray-900 [&>span]:text-black bg-transparent [&>span]:bg-transparent hover:bg-gray-900/90 hover:text-white focus:ring-2 focus:ring-black/40 transition-colors",
      },
    },
    color: {
      secondary:
        "bg-gray-900 text-white hover:bg-gray-900/90 focus:ring-2 focus:ring-black/40 transition-colors",
      primary:
        "bg-blue-700 text-white hover:bg-blue-700/90 focus:ring-2 focus:ring-blue-700/40 transition-colors",
    },
  },
  navbar: {
    root: {
      base: "bg-white px-4 sm:px-8 py-4 md:py-6",
    },
    link: {
      base: "font-medium",
      active: {
        on: "text-blue-700",
        off: "hover:text-blue-700 transition-colors",
      },
    },
  },
  textInput: {
    field: {
      input: {
        base: "w-full bg-gray-50 border border-gray-300 rounded-lg focus:!border-gray-600 focus:outline-none py-4 px-3 outline-none",
      },
    },
  },
  pagination: {
    pages: {
      selector: {
        active:
          "bg-transparent bg-blue-700/5 text-blue-700 hover:!bg-blue-700/5 hover:!text-blue-700",
      },
    },
  },
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
