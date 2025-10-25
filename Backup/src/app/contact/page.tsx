import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Contact Everwell Magazine</h1>
            <div className="prose max-w-3xl mx-auto">
                <p>
                    We’d love to hear from you! Whether you have feedback, questions, or need support, reach out to us via the form below or through our contact details.
                </p>
                <div className="my-6">
                    <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                    <p>
                        Email:{' '}
                        <a href="mailto:support@everwellmag.com" className="text-blue-500 hover:underline">
                            support@everwellmag.com
                        </a>
                    </p>
                    <p>
                        Follow us on{' '}
                        <a href="https://www.facebook.com/everwellmag" className="text-blue-500 hover:underline">
                            Facebook
                        </a>
                        ,{' '}
                        <a href="https://x.com/everwellmag" className="text-blue-500 hover:underline">
                            X
                        </a>
                        , or{' '}
                        <a href="https://www.instagram.com/everwellmag" className="text-blue-500 hover:underline">
                            Instagram
                        </a>
                        .
                    </p>
                </div>
                <div className="my-6">
                    <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
                    <form action="/api/contact" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="w-full p-2 border rounded-md"
                                rows={5}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                <p>
                    <Link href="/" className="text-blue-500 hover:underline">
                        Back to Home
                    </Link>
                </p>
            </div>
        </div>
    );
}