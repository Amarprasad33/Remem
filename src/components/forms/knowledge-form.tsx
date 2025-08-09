'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { knowledgeFormSchema, type KnowledgeFormType } from '@/lib/schema/knowledgeSchema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { saveLink } from '@/actions/knowledge.actions';
import { useTransition } from 'react';

export default function KnowledgeForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<KnowledgeFormType>({
        resolver: zodResolver(knowledgeFormSchema),
        defaultValues: {
            url: '',
            tags: '',
            summary: '',
            note: '',
            remindInDays: undefined,
        },
    });

    async function onSubmit(values: KnowledgeFormType) {
        const fd = new FormData();
        fd.append('url', values.url);
        fd.append('tags', values.tags ?? '');
        fd.append('summary', values.summary ?? '');
        fd.append('note', values.note ?? '');
        if (values.remindInDays !== undefined && values.remindInDays !== null) {
            fd.append('remindInDays', String(values.remindInDays));
        }

        const res = await saveLink(fd);
        if ('error' in res && res.error) {
            toast('Failed to save link', {
                description: typeof res.error === 'string' ? res.error : 'Invalid form input',
            });
            return;
        }
        toast('Saved!', { description: 'Your link was added.' });
        form.reset();
        startTransition(() => router.refresh());
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/article" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags (comma-separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="Design, Marketing, Must Read" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short summary (TL;DR)</FormLabel>
                                <FormControl>
                                    <textarea
                                        rows={3}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                        placeholder="Why is this useful?"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <textarea
                                        rows={3}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                        placeholder="Any additional notes"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="remindInDays"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Remind me in (days) — optional</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 7" inputMode="numeric" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                    {isPending ? 'Saving...' : 'Save link'}
                </Button>
            </form>
        </Form>
    );
}