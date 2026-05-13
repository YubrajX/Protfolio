import { getSiteSettings } from "@/lib/actions"

export async function About() {
    const settings = await getSiteSettings()

    if (!settings?.aboutText) return null

    return (
        <section id="about" className="py-20 px-6 bg-[var(--background)] relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-blue-600 mb-4 inline-block">
                        About Me
                    </h2>
                    <div className="w-20 h-1 bg-[var(--primary)] rounded-full mx-auto" />
                </div>

                <div className="bg-[var(--card-bg)] p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 backdrop-blur-sm">
                    <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-main)] opacity-80">
                        {settings.aboutText.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-center gap-6">
                        {settings.socialLinks && (
                            // @ts-ignore
                            Object.entries(settings.socialLinks).map(([platform, url]) => (
                                url && (
                                    <a
                                        key={platform}
                                        href={url as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--text-main)] opacity-50 hover:opacity-100 hover:text-[var(--primary)] transition-colors capitalize font-medium"
                                    >
                                        {platform}
                                    </a>
                                )
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </section>
    )
}
