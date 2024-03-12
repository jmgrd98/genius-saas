import { NextResponse } from 'next/server';
import Configuration from 'openai';
import OpenAI from 'openai';
import { auth } from '@clerk/nextjs';

const configuration: any = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

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

        const response: any = await openai.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
        });
        
        return NextResponse.json(response?.data.choices[0].message);
    } catch (error) {
        console.error('[CONVERSATION_ERROR]', error);
        return new NextResponse('Internal error', {status:500})
    }
}