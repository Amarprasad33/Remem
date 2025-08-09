'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { knowledgeFormSchema } from '@/lib/schema/knowledgeSchema';
import { fetchUrlMetadata } from '@/lib/fetch-metadata';

export async function saveLink(formData: FormData) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Not authenticated' };
    }

    const raw = {
        url: formData.get('url') as string,
        tags: (formData.get('tags') as string) || '',
        summary: (formData.get('summary') as string) || '',
        note: (formData.get('note') as string) || '',
        remindInDays: formData.get('remindInDays') as string | null,
    };

    const parsed = knowledgeFormSchema.safeParse(raw);
    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const { url, tags, summary, note, remindInDays } = parsed.data;
    const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

    const remind_at =
        remindInDays && !Number.isNaN(remindInDays)
            ? new Date(Date.now() + Number(remindInDays) * 24 * 60 * 60 * 1000)
            : null;

    const meta = await fetchUrlMetadata(url);

    const { data, error } = await supabase
        .from('knowledge_items')
        .insert({
            user_id: user.id,
            url,
            title: meta.title,
            image_url: meta.image_url,
            source_domain: meta.source_domain,
            tags: tagArray,
            summary: summary || null,
            note: note || null,
            remind_at: remind_at,
        })
        .select()
        .single();

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/main');
    return { data };
}

export async function deleteLink(id: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase.from('knowledge_items').delete().eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/main');
    return { success: true };
}
