import { prisma } from "@/lib/prisma"
import { deleteMessage } from "@/lib/actions/contact-actions"
import { Button } from "@/components/ui/form-elements"
import { Trash2, Mail } from "lucide-react"
import { format } from "path" // This import might be wrong for date formatting, using native date

export default async function AdminMessagesPage() {
    const messages = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages</h1>
                    <p className="text-slate-500 mt-1">View contact form submissions.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-full">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">{msg.name}</h3>
                                    <a href={`mailto:${msg.email}`} className="text-sm text-slate-500 hover:text-primary transition-colors">
                                        {msg.email}
                                    </a>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-slate-400 block mb-2">
                                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                                </span>
                                <form action={async () => {
                                    "use server"
                                    await deleteMessage(msg.id)
                                }}>
                                    <Button variant="danger" className="h-8 w-8 p-0 ml-auto" title="Delete">
                                        <Trash2 size={14} />
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                            {msg.message}
                        </div>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No messages yet.
                    </div>
                )}
            </div>
        </div>
    )
}
