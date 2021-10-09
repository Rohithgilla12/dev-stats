import { NextApiHandler } from "next";
import { IConfig, ILayoutConfig } from "../../types";
import { getScreenshot } from "./_lib/chromium";
import { getHtml } from "./_lib/template";

const isDev = !process.env.RAILWAY_STATIC_URL;

const handler: NextApiHandler = async (req, res) => {
  const article = req.query.q;
  console.log(article);
  const data = await fetch(`https://dev.to/api/articles/${article}`);
  if (data.status === 200) {
    const articleData = await data.json();
    const config: IConfig & ILayoutConfig = {
      fileType: "png",
      layoutName: "Article Stats",
      Theme: "Dark",
      Title: "Self-hosted website analytics",
      article:
        "gillarohith/automate-your-personal-crm-with-notion-and-kelvin-data-ono",
      totalReactions: articleData.public_reactions_count.toString(),
    };
    const html = getHtml(config);
    const { fileType } = config;
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );
    res.end(file);
  } else {
    res.json({ error: "Article not found" });
  }
};

export default handler;
