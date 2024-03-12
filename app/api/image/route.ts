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
        const { prompt, amount = '1', resolution = '512x512' } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401});
        }

        if (!configuration.apiKey) {
            return new NextResponse('OpenAI API Key not configured', { status: 500 })
        }

        if (!prompt) {
            return new NextResponse('Prompt is required', { status: 400 })
        }

        if (!amount) {
            return new NextResponse('Amount is required', { status: 400 })
        }

        if (!resolution) {
            return new NextResponse('Resolution is required', { status: 400 })
        }

        const response: any = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        console.log(response);
        
        return NextResponse.json(response?.data.data);
    } catch (error) {
        console.error('[IMAGE_ERROR]', error);
        return new NextResponse('Internal error', {status:500})
    }
}