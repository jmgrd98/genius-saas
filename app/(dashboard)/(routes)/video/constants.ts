import * as zod from 'zod';

export const formSchema = zod.object({
    prompt: zod.string().min(1, {
        message: 'Video prompt is required',
    })
})