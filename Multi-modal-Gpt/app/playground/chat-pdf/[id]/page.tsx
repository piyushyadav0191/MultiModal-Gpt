"use client"
import React, { use } from "react";
import Panels from "./_include/panels";

type Props = {
    params: Promise<{
        id: string;
    }>
}

const ChatWithPdf = (props: Props) => {
  const params = use(props.params);
  const [chatId, setChatId] = React.useState<string>("");

  React.useEffect(() => {
    if (params.id) {
      setChatId(params.id);
    }
  }, [params.id]);
  return (
    <div>
      <Panels chatId={chatId} setChatId={setChatId} />
    </div>
  );
};

export default ChatWithPdf;
