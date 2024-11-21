"use client";

import React, { use } from "react";

import ChatPage from "~/components/chat/chat-page";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [chatId, setChatId] = React.useState<string>("");

  React.useEffect(() => {
    if (params.id) {
      setChatId(params.id);
    }
  }, [params.id]);

  return <ChatPage chatId={chatId} setChatId={setChatId} />;
}
