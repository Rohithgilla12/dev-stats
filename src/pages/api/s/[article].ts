import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { article } = req.query;
  const data = await fetch(`https://dev.to/api/articles/${article}`);
  const json = await data.json();
  res.json(json);
};

export default handler;
