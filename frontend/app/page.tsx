import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Testimonials from '@/components/home/Testimonials'

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <Hero />
                <WhyChooseUs />
                <FeaturedProducts />
                <Testimonials />
            </main>
            <Footer />
        </div>
    )
}
