import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpen, CheckCircle, Globe, Users } from 'lucide-react';
// import africa50 from '../../../public/assets/images/sponsors/Africa_50.jpg';
// import cnuced from '../../../public/assets/images/sponsors/cnuced.jpeg';
// import iom from '../../../public/assets/images/sponsors/iom.jpeg';
// import jadara from '../../../public/assets/images/sponsors/Jadaralogo.png';
// import oit from '../../../public/assets/images/sponsors/oit.jpeg';
// import onusida from '../../../public/assets/images/sponsors/onusida.jpeg';
// import pan from '../../../public/assets/images/sponsors/pan.jpeg';
// import unfpa from '../../../public/assets/images/sponsors/unfpa.jpeg';
// import kamlin from '../../../public/assets/images/sponsors/kamlin.jpeg';
// import lionsgeek from '../../../public/assets/images/sponsors/lionsgeek.png';
// import iecd from '../../../public/assets/images/sponsors/iecd.png';
// import yeslearning from '../../../public/assets/images/yes-learning.png';
export default function Welcome() {
    const { auth } = usePage().props;
    console.log(auth);
    const sponsors = [
        {
            img: "Africa_50.jpg",
            name: 'Africa 50',
        },
        {
            img: "cnuced.jpeg",
            name: 'Cnuced',
        },
        {
            img: "iom.jpeg",
            name: 'IOM',
        },

        {
            img: 'oit.jpeg',
            name: 'OIT',
        },
        {
            img: "onusida.jpeg",
            name: 'Onusida',
        },

        {
            img: "unfpa.jpeg",
            name: 'UNFPA',
        },
    ];
    const technicalPartners = [
        {
            img: "kamlin.jpeg",
            name: 'Kamlin',
        },
        {
            img: "lionsgeek.png",
            name: 'Lions Geek',
        },
        {
            img: "iecd.png",
            name: 'IECD',
        },
    ];
    return (
        <div className="flex min-h-screen flex-col bg-white lg:p-6">
            <Head title="Welcome To" />
            <header className="/80 sticky top-0 z-10 bg-white/30 backdrop-blur-md">
                <div className="container flex h-20 items-center justify-between px-6 md:px-8">
                    <div className="flex items-center gap-3">
                        <img width={140} src={`/assets/images/yes-learning.png`}alt="" />
                    </div>
                    <nav className="hidden gap-8 md:flex">
                        <Link href="#features" className="hover:text-beta text-alpha text-sm font-medium transition-colors">
                            Features
                        </Link>
                        <Link href="#about" className="hover:text-beta text-alpha text-sm font-medium transition-colors">
                            About
                        </Link>
                        <Link href="#testimonials" className="hover:text-beta text-alpha text-sm font-medium transition-colors">
                            Testimonials
                        </Link>
                        <a
                            target="_blank"
                            href="https://youthempowermentsummit.africa/contact"
                            className="hover:text-beta text-alpha text-sm font-medium transition-colors"
                        >
                            Contact
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        {!auth.user ? (
                            <Link
                                href="/login"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-[#295da6] px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:ring-1 focus-visible:outline-none"
                            >
                                Login
                            </Link>
                        ) : auth.user.role == 'admin' ? (
                            <Link
                                href="/admin/dashboard"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-[#295da6] px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:ring-1 focus-visible:outline-none"
                            >
                                Admin Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/dashboard"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-[#295da6] px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:ring-1 focus-visible:outline-none"
                            >
                                Dashboard
                            </Link>
                        )}
                        <Button variant="outline" size="icon" className="md:hidden">
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1 bg-white">
                <section className="w-full bg-gradient-to-b pt-6">
                    <div className="container px-6 md:px-8">
                        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                            <div className="space-y-6">
                                <div className="inline-block rounded-lg bg-[#b09417]/10 px-4 py-1.5 text-sm font-medium text-[#b09417]">
                                    Empowering NGOs Across Africa{' '}
                                </div>
                                <h1 className="text-3xl font-bold tracking-tighter text-[#295da6] sm:text-5xl md:text-6xl">
                                    Transform Your Organization with Yes Learning
                                </h1>
                                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    A dedicated learning platform designed specifically for NGOs across Africa. Enhance skills, share knowledge, and
                                    build capacity within your organization.
                                </p>
                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                    {!auth.user ? (
                                        <Link
                                            href="/login"
                                            className="inline-flex h-12 items-center justify-center rounded-md bg-[#295da6] px-8 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:ring-1 focus-visible:outline-none"
                                        >
                                            Login
                                        </Link>
                                    ) : auth.user.role == 'admin' ? (
                                        <Link
                                            href="/admin/dashboard"
                                            className="inline-flex h-12 items-center justify-center rounded-md bg-[#295da6] px-8 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:ring-1 focus-visible:outline-none"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/dashboard"
                                            className="inline-flex h-12 items-center justify-center rounded-md bg-[#295da6] px-8 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:ring-1 focus-visible:outline-none"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <a
                                        target="_blank"
                                        href="https://youthempowermentsummit.africa/contact"
                                        className="inline-flex h-12 items-center justify-center rounded-md border border-[#b09417] px-8 text-sm font-medium text-[#b09417] shadow-sm transition-colors hover:bg-[#b09417]/10 focus-visible:ring-1 focus-visible:outline-none"
                                    >
                                        Contact Us to Join
                                    </a>
                                </div>
                            </div>
                            <div className="mx- lg:ml-auto">
                                <div className="overflow-hidden rounded-xl shadow-lg">
                                    <img
                                        src="https://youthempowermentsummit.africa/assets/hero4-DB0NOoou.jpg"
                                        alt="Yes Learning Platform"
                                        width={550}
                                        height={550}
                                        className="aspect-square object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="w-full py-16 md:py-28 lg:py-20">
                    <div className="container px-6 md:px-8">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center">
                            <div className="space-y-3">
                                <div className="inline-block rounded-lg bg-[#295da6]/10 px-4 py-1.5 text-sm font-medium text-[#295da6]">
                                    Platform Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter text-[#295da6] sm:text-4xl md:text-5xl">
                                    Everything You Need to Succeed
                                </h2>
                                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Yes Learning provides a comprehensive suite of tools designed specifically for NGOs operating in Africa.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-8 py-16 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-4 rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                                <div className="rounded-full bg-[#295da6]/10 p-4">
                                    <BookOpen className="h-7 w-7 text-[#295da6]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#295da6]">Customized Courses</h3>
                                <p className="text-center text-gray-600">
                                    Access courses specifically designed for NGO operations, management, and development in the African context.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                                <div className="rounded-full bg-[#b09417]/10 p-4">
                                    <Globe className="h-7 w-7 text-[#b09417]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#b09417]">Community Network</h3>
                                <p className="text-center text-gray-600">
                                    Connect with other NGOs across Africa to share experiences, resources, and best practices.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                                <div className="rounded-full bg-[#295da6]/10 p-4">
                                    <Users className="h-7 w-7 text-[#295da6]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#295da6]">Team Management</h3>
                                <p className="text-center text-gray-600">
                                    Easily manage your team's learning progress, assign courses, and track development.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="w-full py-16 md:py-28 lg:py-20">
                    <div className="container px-6 md:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div className="mx-auto">
                                <div className="overflow-hidden rounded-xl shadow-lg">
                                    <img
                                        src="https://youthempowermentsummit.africa/assets/hero4-DB0NOoou.jpg"
                                        alt="NGO Training Session"
                                        width={600}
                                        height={400}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="inline-block rounded-lg bg-[#b09417]/10 px-4 py-1.5 text-sm font-medium text-[#b09417]">
                                    Our Mission
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter text-[#295da6] sm:text-4xl">Empowering NGOs Through Education</h2>
                                <p className="text-gray-600 md:text-xl/relaxed">
                                    Yes Learning was founded with a clear mission: to provide accessible, relevant, and impactful education to NGOs
                                    working across Africa.
                                </p>
                                <ul className="grid gap-3">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-[#b09417]" />
                                        <span className="text-gray-700">Tailored content for African NGO context</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-[#b09417]" />
                                        <span className="text-gray-700">Accessible online and offline learning</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-[#b09417]" />
                                        <span className="text-gray-700">Collaborative community of practice</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-[#b09417]" />
                                        <span className="text-gray-700">Continuous support and mentorship</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full px-10 py-16 md:py-28 lg:py-20">
                    <div className="flex flex-col items-center justify-center space-y-16 text-center">
                        <div className="space-y-3">
                            <div className="inline-block rounded-lg bg-[#295da6]/10 px-4 py-1.5 text-sm font-medium text-[#295da6]">
                                Platform Organizers
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter text-[#295da6] sm:text-4xl md:text-5xl">About Organizers</h2>
                            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Yes Learning platform is the result of a collaborative effort between the Jadara Foundation and Pan Africa, united in
                                their mission to empower youth through accessible education.
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row  justify-between">
                            <div className="flex w-full lg:w-[50%] justify-center">
                                <img className="" src={`/assets/images/sponsors/Jadaralogo.png}`} alt="" />
                            </div>
                            <div className="w-full lg:w-[50%] text-left">
                                <h3 className="text-2xl font-bold">Jadara Foundation :</h3>
                                <p>
                                    Moroccan non-profit association recognized as serving the public good, created in 2002. Its mission is to allow
                                    every young person to choose and build their future with confidence and ambition, without being subjected to
                                    social, territorial, disability, or gender determinism. Every year, we search for, mobilize, and identify young
                                    people to inspire, guide, support them financially, provide them with a mentor, and develop their transversal
                                    skills. To achieve this, we deploy social ascent programs supported by educational partners, impact-driven
                                    companies, committed volunteers, and donors who are sensitive to our cause. The Foundation, with over two decades
                                    of experience, has developed a robust model that positions it today as a key player in the third sector. This long
                                    journey has been marked by impact and sustainable successes, allowing the Foundation to consolidate its reputation
                                    as a catalyst for social ascent in Morocco. Today, as a reliable third-sector actor, the Foundation continues to
                                    work with determination to contribute to significant and lasting changes, further strengthening its position as a
                                    trusted partner and engine for social progress that has transformed the lives of over 2,750 young people in
                                    Morocco.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-5 flex-col-reverse lg:flex-row  justify-between">
                            <div className="w-full lg:w-[50%] text-left">
                                <h3 className="text-2xl font-bold">Pan-African Youth Union:</h3>
                                <p>
                                    The Pan-African Youth Union (PYU) is a continental organization dedicated to empowering African youth and
                                    promoting unity, peace, and sustainable development. Founded in 1962 in Conakry, Guinea, originally as the
                                    Pan-African Youth Movement (PYM), it played a crucial role in mobilizing youth for Africa’s decolonization. Today,
                                    UPJ unites national youth councils, civil society organizations, and regional platforms to foster African
                                    integration and strengthen the values of the African Union (AU). Working alongside governments and development
                                    partners, it continues to adapt to the evolving challenges of African youth, ensuring their active participation
                                    in shaping the continent’s future.
                                </p>
                            </div>
                            <div className="flex w-full lg:w-[50%] justify-center">
                                <img className="" src={`/assets/images/sponsors/pan.jpeg`} alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="sponsors" className="w-full py-16 md:py-28 lg:py-20 flex flex-col gap-16 px-10">
                    <div className="flex flex-col items-center justify-center space-y-16 text-center">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter text-[#295da6] sm:text-4xl md:text-5xl">Partners </h2>
                        </div>
                        <div className="flex flex-wrap justify-between w-full">
                            {sponsors.map((sponsor, index) => (
                                <div key={index} className="flex justify-center">
                                    <img className="aspect-square w-36 object-contain" src={`/assets/images/sponsors/${sponsor.img}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-16 text-center">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter text-[#295da6] sm:text-4xl md:text-5xl"> Technical Partners </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-16">
                            {technicalPartners.map((partner, index) => (
                                <div key={index} className="flex justify-center">
                                    <img className="aspect-square w-36 object-contain" src={`/assets/images/sponsors/${partner.img}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="testimonials" className="w-full py-16 md:py-28 lg:py-20">
                    <div className="container px-6 md:px-8">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center">
                            <div className="space-y-3">
                                <div className="inline-block rounded-lg bg-[#295da6]/10 px-4 py-1.5 text-sm font-medium text-[#295da6]">
                                    Success Stories
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter text-[#295da6] sm:text-4xl md:text-5xl">Hear From Our Partners</h2>
                                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    NGOs across Africa are transforming their operations with Yes Learning.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-8 py-16 lg:grid-cols-2">
                            <div className="flex flex-col justify-between rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                                <div className="space-y-4">
                                    <p className="text-lg text-gray-600 italic">
                                        "Yes Learning has transformed how we train our staff. The platform's focus on African contexts makes the
                                        content immediately applicable to our work."
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-6">
                                    <div className="rounded-full bg-[#295da6]/10 p-1">
                                        <div className="h-12 w-12 rounded-full bg-[#295da6]/20" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Sarah Okonkwo</p>
                                        <p className="text-sm text-gray-600">Director, Community Health Initiative, Nigeria</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                                <div className="space-y-4">
                                    <p className="text-lg text-gray-600 italic">
                                        "The community aspect of Yes Learning has been invaluable. We've connected with similar organizations across
                                        East Africa and share resources regularly."
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-6">
                                    <div className="rounded-full bg-[#b09417]/10 p-1">
                                        <div className="h-12 w-12 rounded-full bg-[#b09417]/20" />
                                    </div>
                                    <div>
                                        <p className="font-medium">David Mutua</p>
                                        <p className="text-sm text-gray-600">Program Manager, Education Access Kenya</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="w-full bg-gradient-to-b from-[#295da6] to-[#1e4a8a] py-16 md:py-28 lg:py-20">
                    <div className="container px-6 text-white md:px-8">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your NGO?</h2>
                                <p className="max-w-[700px] text-[#ffffff]/90 md:text-xl/relaxed">
                                    Join the growing community of African NGOs enhancing their impact through continuous learning.
                                </p>
                            </div>
                            <div className="w-full max-w-md space-y-2 pt-6">
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    {!auth.user ? (
                                        <Link
                                            href="/login"
                                            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#295da6] shadow-md transition-colors hover:bg-gray-100 focus-visible:ring-1 focus-visible:outline-none"
                                        >
                                            Login
                                        </Link>
                                    ) : auth.user.role == 'admin' ? (
                                        <Link
                                            href="/admin/dashboard"
                                            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#295da6] shadow-md transition-colors hover:bg-gray-100 focus-visible:ring-1 focus-visible:outline-none"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/dashboard"
                                            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#295da6] shadow-md transition-colors hover:bg-gray-100 focus-visible:ring-1 focus-visible:outline-none"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <a
                                        target="_blank"
                                        href="https://youthempowermentsummit.africa/contact"
                                        className="hover:/10 inline-flex h-12 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                                    >
                                        Contact Us to Join <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t">
                <div className="container flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <img width={140} src="/assets/images/yes-learning.png" alt="yes-learning logo" />
                        </div>
                        <p className="max-w-xs text-sm text-gray-500">
                            Empowering NGOs across Africa through education and capacity building. by jadara fondation and Pan-African Youth Union
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:flex-row md:gap-8">
                        <Link href="#" className="text-sm transition-colors hover:text-[#295da6]">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm transition-colors hover:text-[#295da6]">
                            Terms of Service
                        </Link>
                        <a   href="https://youthempowermentsummit.africa/contact" target='_blank' className="text-sm transition-colors hover:text-[#295da6]">
                            Contact
                        </a>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Yes Learning. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
