export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-7xl px-8 py-8 mt-14">
            <h1 className="text-4xl font-bold text-center mb-8">About Sidhu Motors</h1>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Founded in 2024, Sidhu Motors began with a simple yet powerful vision: to provide
                    our community with reliable, high-quality vehicles and an unparalleled car-buying experience.
                    What started as a small dealership has grown into a trusted name, built on a foundation of
                    integrity, transparency, and a genuine passion for automobiles.
                </p>
                <p className="text-lg leading-relaxed">
                    Over the years, we've helped thousands of customers find their perfect ride, from family sedans
                    to rugged SUVs and powerful trucks. Our commitment to excellence has remained unwavering,
                    driving us to continuously improve and adapt to the evolving needs of our clientele.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-lg leading-relaxed">
                    At Sidhu Motors, our mission is to empower our customers with informed choices, offering a diverse
                    selection of meticulously inspected vehicles coupled with exceptional customer service. We strive
                    to create a welcoming and pressure-free environment where every client feels valued and confident
                    in their purchase. We believe in building lasting relationships, not just making sales.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Why Choose Sidhu Motors?</h2>
                <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
                    <li><strong>Quality Assurance:</strong> Every vehicle on our lot undergoes a rigorous multi-point inspection by certified technicians.</li>
                    <li><strong>Transparent Pricing:</strong> We believe in clear, upfront pricing with no hidden fees.</li>
                    <li><strong>Exceptional Customer Service:</strong> Our friendly and knowledgeable team is dedicated to making your experience smooth and enjoyable.</li>
                    <li><strong>Diverse Inventory:</strong> A wide range of makes and models to suit every budget and lifestyle.</li>
                    <li><strong>Community Focused:</strong> We are proud to be an active part of the local community.</li>
                </ul>
            </section>

            <section className="text-center">
                <h2 className="text-3xl font-semibold mb-4">Come Visit Us!</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Experience the Sidhu Motors difference for yourself. We invite you to visit our showroom,
                    browse our inventory, and meet our team. We look forward to helping you drive away in your
                    dream car!
                </p>
                <p className="text-lg font-medium">
                    Contact Us today: <a href="tel:+923456881529" className="text-blue-600 hover:underline">+92 345 6881529</a>.
                </p>
                <p className="text-lg font-medium">
                    or visit us at : <p className="text-blue-600 hover:underline">District Gujrat, Tehsil Kharian, Post Office Sidh, Kharian, Pakistan, 50972</p>
                </p>
            </section>
        </div>
    );
}