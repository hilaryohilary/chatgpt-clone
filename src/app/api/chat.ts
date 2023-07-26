import { toast } from "react-toastify";

export async function chatWithAi(value: string, chatSessions: Array<{ role: String; content: String }>) {
try {
      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_openAIAPISECRET_KEY}`,
      };
      const prompt = {
        model: "gpt-3.5-turbo",
        messages: [...chatSessions, { role: "user", content: value }],
        stream: true,
      };

      // const response = await axios.post(url, prompt, {
      //   headers,
      // });
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(prompt),
      });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
    let responseText = "";
    let chatId;

      while (true) {
        const chunk = await reader!.read();
        const { done, value } = chunk;
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value);
          const lines: string[] = decodedChunk.split("\n");
        const parsedLines = lines
          .map((line: any) => line.replace(/^data: /, "").trim())
          .filter((line: any) => line !== "" && line !== "[DONE]")
          .map((line: any) => JSON.parse(line));

        for (const parsedLine of parsedLines) {
          const { choices, id } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          console.log(content);
          if (content) {
              responseText += content;
                chatId = id;
          }
          }
    }

    return { responseText, responseLoading: false, chatId };

} catch (error: any) {
    toast.error(error.message, {
              position: "top-center",
              theme: "colored",
            });
      console.log(error);
    } 

} 