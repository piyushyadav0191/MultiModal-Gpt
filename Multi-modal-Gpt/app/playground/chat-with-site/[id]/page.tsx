"use client"

import React, { use } from "react";
import WebsiteScrapper from "./_includes/WebsiteScrapper";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function page(props: Props) {
  const params = use(props.params);

  const {
    id
  } = params;

  const [chatId, setChatId] = React.useState<string>("");

  React.useEffect(() => {
    
    if (id) {
      setChatId(id);
    }
  }, [id]);
  return (
    <>
      <WebsiteScrapper chatId={chatId} setChatId={setChatId} />
    </>
  );
}
