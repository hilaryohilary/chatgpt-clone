import { toast } from "react-toastify";

export async function chatWithAi(value: string, chatSessions: Array<{ role: String; content: String }>) {
try {
  const url = process.env.NEXT_PUBLIC_Server!;
  const data = [...chatSessions, {role: "user", content: value}]

  
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      })
  const res = await response.json();
        let chatId = res.id;
  let responseText = res.choices[0].message.content;

  return { responseText, chatId, responseLoading: false};

} catch (error: any) {
    toast.error("Something went wrong", {
              position: "top-center",
              theme: "colored",
            });
    } 
} 
