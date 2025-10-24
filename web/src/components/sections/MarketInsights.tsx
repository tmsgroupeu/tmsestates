import Section from "@/components/Section"; // CORRECTED PATH
import ArticleCard from "@/components/ui/ArticleCard"; // CORRECTED PATH

// STATIC DATA FOR PRESENTATION
const articles = [
    { slug: 'limassol-investment-guide-2025', image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'The Investor’s Guide to Limassol: Q4 2025 Outlook', excerpt: 'An in-depth analysis of property value trends, upcoming developments, and key areas for capital growth in the coming year.' },
    { slug: 'relocating-to-cyprus', image: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Seamless Relocation: The Benefits of a Cypriot Residency', excerpt: 'Discover the lifestyle, tax, and business advantages of relocating to Cyprus, and how we can facilitate your move.' },
    { slug: 'seafront-vs-city-living', image: 'https://images.pexels.com/photos/221522/pexels-photo-221522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Seafront vs. City Living in Limassol: A Lifestyle Comparison', excerpt: 'A detailed look at two of the most popular lifestyle choices. We compare amenities, atmosphere, and investment potential.' }
];

export default function MarketInsights() {
    return (
        <Section
            id="insights"
            title="Market Insights"
            subtitle="Expert analysis and guides to help you make informed decisions in the Limassol property market."
        >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map(article => <ArticleCard key={article.slug} {...article} />)}
            </div>
        </Section>
    )
}