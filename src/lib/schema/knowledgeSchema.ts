import { z } from 'zod';

export const knowledgeFormSchema = z.object({
    url: z.url('Enter a valid URL'),
    tags: z.string().optional().default(''),
    summary: z.string().max(500, 'Keep summary under 500 characters').optional(),
    note: z.string().max(2000, 'Keep note under 2000 characters').optional(),
    remindInDays: z.coerce.number().int().positive().max(365, 'Max 365 days').optional()
})

export type KnowledgeFormType = z.infer<typeof knowledgeFormSchema>;