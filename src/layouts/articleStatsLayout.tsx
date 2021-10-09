import { useEffect, useState } from "react";
import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { colourThemes, defaultTheme } from "./colours";
import { getTheme, Markdown } from "./utils";
import colors from "tailwindcss/colors";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  //   const colours = colourThemes[theme];

  return `
    body {
      background: ${colors.teal[900]};
      color: ${colors.white};
      
    }

    h1 {
      font-size: 100px;
      margin: 75px 0;
    }

    h2 {
      font-size: 50px;
      margin-top: 25px;
    }
  `;
};

const Component: LayoutComponent = ({ config }) => {
  if (config.totalReactions) {
    return (
      <div className="bg-teal-400 w-full h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold">{config.totalReactions}</h1>
          <h2 className="text-2xl">Reactions</h2>
        </div>
      </div>
    );
  }
  return <Markdown className="header">{JSON.stringify(config)}</Markdown>;
};

export const articleStatsLayout: ILayout = {
  name: "Article Stats",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Title",
      type: "text",
      default: "Self-hosted website analytics",
      placeholder: "Big text",
    },
    {
      name: "article",
      type: "text",
      default:
        "gillarohith/automate-your-personal-crm-with-notion-and-kelvin-data-ono",
      placeholder: "Big text",
    },
    {
      name: "totalReactions",
      type: "number",
      default: "0",
    },
  ],
  getCSS,
  Component,
};
