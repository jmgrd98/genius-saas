import { NextResponse } from 'next/server';
import Configuration from 'openai';
import OpenAI from 'openai';
import { auth } from '@clerk/nextjs';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';

const configuration: any = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

const instructionMessage: ChatCompletionMessageParam = {
    role: 'system',
    content: 'You are a code generator. You must answer only in mardown code snippets. Use code comments for explanations.'
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401});
        }

        if (!configuration.apiKey) {
            return new NextResponse('OpenAI API Key not configured', { status: 500 })
        }

        if (!messages) {
            return new NextResponse('Messages are required', { status: 400 })
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        await increaseApiLimit();

        const response: any = await openai.chat.completions.create({
            messages: [instructionMessage, ...messages],
            model: "gpt-3.5-turbo",
        });

        console.log(response);
        
        return NextResponse.json(response?.choices[0].message);
    } catch (error) {
        console.error('[CODE_ERROR]', error);
        return new NextResponse('Internal error', {status:500})
    }
}