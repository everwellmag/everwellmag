export default function SiteSchema() {
    return (
        <script type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Everwell Magazine',
                url: 'https://www.everwellmag.com/',
                description: 'Your trusted source for health and wellness insights, expert advice, and top-quality supplements tailored for the US audience.',
            })}
        </script>
    );
}