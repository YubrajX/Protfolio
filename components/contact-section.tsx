import { ContactForm } from "./contact-form"
import { getSiteSettings } from "@/lib/actions"
import { Mail, Phone } from "lucide-react"

export async function ContactSection() {
    const settings = await getSiteSettings()

    return (
        <section id="contact" className="py-24 px-6 relative">
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Info */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Let's Work Together</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            Have a project in mind or want to discuss modern web technologies? I'm always open to new opportunities and interesting conversations.
                        </p>

                        <div className="pt-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email Me</p>
                                    <a href={`mailto:${settings?.email}`} className="font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors">
                                        {settings?.email || "hello@example.com"}
                                    </a>
                                </div>
                            </div>

                            {settings?.phone && (
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Call Me</p>
                                        <a href={`tel:${settings.phone}`} className="font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors">
                                            {settings.phone}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Send a Message</h3>
                        <ContactForm />
                    </div>

                </div>
            </div>
        </section>
    )
}
