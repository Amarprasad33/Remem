import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import KnowledgeForm from '@/components/forms/knowledge-form';
import { deleteLink } from '@/actions/knowledge.actions';

type SearchParams = {
    q?: string;
    tag?: string;
};

export default async function Remem({ searchParams }: { searchParams: SearchParams }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="mt-40 text-center">
                <p>You must sign in to use the app.</p>
                <Link className="text-blue-600 underline" href="/signin">Sign in</Link>
            </div>
        );
    }

    const q = searchParams?.q?.trim();
    const tag = searchParams?.tag?.trim();

    let query = supabase
        .from('knowledge_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (q) {
        query = query.or(`title.ilike.%${q}%,summary.ilike.%${q}%,note.ilike.%${q}%`);
    }
    if (tag) {
        query = query.contains('tags', [tag]);
    }

    const { data: items, error } = await query;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold mb-2">Save a link</h1>
                <KnowledgeForm />
            </div>

            <div className="mb-4">
                <form method="get" className="flex gap-2">
                    <input
                        type="text"
                        name="q"
                        defaultValue={q}
                        placeholder="Search title, summary, note"
                        className="flex-1 border rounded-md px-3 py-2 text-sm"
                    />
                    <input
                        type="text"
                        name="tag"
                        defaultValue={tag}
                        placeholder="Filter tag (e.g. Design)"
                        className="w-48 border rounded-md px-3 py-2 text-sm"
                    />
                    <button className="border rounded-md px-3 py-2 text-sm" type="submit">
                        Apply
                    </button>
                </form>
            </div>

            {error ? (
                <p className="text-red-600">Failed to load items: {error.message}</p>
            ) : items && items.length > 0 ? (
                <ul className="space-y-3">
                    {items.map((it) => (
                        <li key={it.id} className="border rounded-md p-4 bg-white">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <a className="font-medium text-blue-700 hover:underline" href={it.url} target="_blank" rel="noreferrer">
                                        {it.title || it.url}
                                    </a>
                                    <div className="text-xs text-zinc-500">{it.source_domain}</div>
                                    {Array.isArray(it.tags) && it.tags.length > 0 ? (
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {it.tags.map((t: string) => (
                                                <span key={t} className="text-xs bg-zinc-100 border rounded px-2 py-0.5">{t}</span>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>

                                <form action={async () => { 'use server'; await deleteLink(it.id); }}>
                                    <button className="text-red-600 text-sm underline" type="submit">Delete</button>
                                </form>
                            </div>

                            {it.summary ? <p className="mt-2 text-sm text-zinc-700">{it.summary}</p> : null}
                            {it.note ? <p className="mt-1 text-sm text-zinc-600">{it.note}</p> : null}
                            {it.remind_at ? (
                                <div className="mt-1 text-xs text-zinc-500">
                                    Remind at: {new Date(it.remind_at).toLocaleString()}
                                </div>
                            ) : null}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-zinc-600">No items yet. Add your first link above.</p>
            )}
        </div>
    );
}