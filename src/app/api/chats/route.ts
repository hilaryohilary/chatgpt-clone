import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const url = process.env.NEXT_PUBLIC_openAI_COMPLETION_URl!;
        
         const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.openAIAPISECRET_KEY}`,
        };
        const body = await req.json();
      const prompt = {
        model: "gpt-3.5-turbo",
        messages: body,
        };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(prompt),
      });
        const res = await response.json();

        return NextResponse.json(res);
    } catch (error:any) {
        return NextResponse.json(error);
    }
    
}

