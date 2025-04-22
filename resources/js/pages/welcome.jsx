import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Globe, Users, CheckCircle } from "lucide-react"
import { Head, Link, usePage } from "@inertiajs/react"


export default function Welcome() {
    const { auth } = usePage().props;
    console.log(auth);

    return (
        <div className="flex flex-col min-h-screen bg-white lg:p-6">
            <Head title="Welcome To" />
            <header className="  bg-white/30 sticky top-0 z-10 /80 backdrop-blur-md">
                <div className="container flex h-20 items-center justify-between px-6 md:px-8">
                    <div className="flex items-center gap-3">
                        <img width={100} src="https://youthempowermentsummit.africa/assets/yeslogo-CWn7tdd7.png" alt="" />
                    </div>
                    <nav className="hidden md:flex gap-8">
                        <Link href="#features" className="text-sm font-medium hover:text-beta text-alpha transition-colors">
                            Features
                        </Link>
                        <Link href="#about" className="text-sm font-medium hover:text-beta text-alpha transition-colors">
                            About
                        </Link>
                        <Link href="#testimonials" className="text-sm font-medium hover:text-beta text-alpha transition-colors">
                            Testimonials
                        </Link>
                        <a target="_blank" href="https://youthempowermentsummit.africa/contact" className="text-sm font-medium hover:text-beta text-alpha transition-colors">
                            Contact
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        {
                            !auth.user ?
                                <Link
                                    href="/login"
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#295da6]  px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:outline-none focus-visible:ring-1"
                                >
                                    Login
                                </Link>
                                :
                                auth.user.role == "admin" ?
                                    <Link
                                        href="/admin/dashboard"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-[#295da6]  px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:outline-none focus-visible:ring-1"
                                    >
                                        Admin Dashboard
                                    </Link>

                                    :

                                    <Link
                                        href="/dashboard"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-[#295da6]  px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:outline-none focus-visible:ring-1"
                                    >
                                        Dashboard
                                    </Link>

                        }
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
                <section className="w-full pt-6 bg-gradient-to-b ">
                    <div className="container px-6 md:px-8">
                        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                            <div className="space-y-6">
                                <div className="inline-block rounded-lg bg-[#b09417]/10 px-4 py-1.5 text-sm text-[#b09417] font-medium">
                                    Empowering NGOs Across Africa                                </div>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#295da6]">
                                    Transform Your Organization with Yes Learning
                                </h1>
                                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    A dedicated learning platform designed specifically for NGOs across Africa. Enhance skills, share
                                    knowledge, and build capacity within your organization.
                                </p>
                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">


                                    {
                                        !auth.user ?
                                            <Link
                                                href="/login"
                                                className="inline-flex h-12 items-center justify-center rounded-md bg-[#295da6] px-8 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:outline-none focus-visible:ring-1"
                                            >
                                                Login
                                            </Link>
                                            :
                                            auth.user.role == "admin" ?
                                                <Link
                                                    href="/admin/dashboard"
                                                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#295da6] px-8 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:outline-none focus-visible:ring-1"
                                                >
                                                    Admin Dashboard
                                                </Link>

                                                :

                                                <Link
                                                    href="/dashboard"
                                                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#295da6] px-8 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#295da6]/90 focus-visible:outline-none focus-visible:ring-1"
                                                >
                                                    Dashboard
                                                </Link>

                                    }
                                    <a
                                        target="_blank"
                                        href="https://youthempowermentsummit.africa/contact"
                                        className="inline-flex h-12 items-center justify-center rounded-md border border-[#b09417]  px-8 text-sm font-medium text-[#b09417] shadow-sm transition-colors hover:bg-[#b09417]/10 focus-visible:outline-none focus-visible:ring-1"
                                    >
                                        Contact Us to Join
                                    </a>
                                </div>
                            </div>
                            <div className="mx-auto lg:ml-auto">
                                <div className="rounded-xl overflow-hidden shadow-lg">
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

                <section id="features" className="w-full py-16 md:py-28 lg:py-36 ">
                    <div className="container px-6 md:px-8">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center">
                            <div className="space-y-3">
                                <div className="inline-block rounded-lg bg-[#295da6]/10 px-4 py-1.5 text-sm text-[#295da6] font-medium">
                                    Platform Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#295da6]">
                                    Everything You Need to Succeed
                                </h2>
                                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Yes Learning provides a comprehensive suite of tools designed specifically for NGOs operating in
                                    Africa.
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
                                    Access courses specifically designed for NGO operations, management, and development in the African
                                    context.
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

                <section id="about" className="w-full py-16 md:py-28 lg:py-36 ">
                    <div className="container px-6 md:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <div className="space-y-6">
                                <div className="inline-block rounded-lg bg-[#b09417]/10 px-4 py-1.5 text-sm text-[#b09417] font-medium">
                                    Our Mission
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#295da6]">
                                    Empowering NGOs Through Education
                                </h2>
                                <p className="text-gray-600 md:text-xl/relaxed">
                                    Yes Learning was founded with a clear mission: to provide accessible, relevant, and impactful
                                    education to NGOs working across Africa.
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
                            <div className="mx-auto">
                                <div className="rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://youthempowermentsummit.africa/assets/hero4-DB0NOoou.jpg"
                                        alt="NGO Training Session"
                                        width={600}
                                        height={400}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="w-full py-16 md:py-28 lg:py-36 ">
                    <div className="container px-6 md:px-8">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center">
                            <div className="space-y-3">
                                <div className="inline-block rounded-lg bg-[#295da6]/10 px-4 py-1.5 text-sm text-[#295da6] font-medium">
                                    Success Stories
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#295da6]">
                                    Hear From Our Partners
                                </h2>
                                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    NGOs across Africa are transforming their operations with Yes Learning.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-8 py-16 lg:grid-cols-2">
                            <div className="flex flex-col justify-between rounded-xl border p-8 shadow-sm transition-all hover:shadow-md">
                                <div className="space-y-4">
                                    <p className="text-gray-600 italic text-lg">
                                        "Yes Learning has transformed how we train our staff. The platform's focus on African contexts makes
                                        the content immediately applicable to our work."
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
                                    <p className="text-gray-600 italic text-lg">
                                        "The community aspect of Yes Learning has been invaluable. We've connected with similar
                                        organizations across East Africa and share resources regularly."
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

                <section id="contact" className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-b from-[#295da6] to-[#1e4a8a]">
                    <div className="container px-6 md:px-8 text-white">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Transform Your NGO?
                                </h2>
                                <p className="max-w-[700px] text-[#ffffff]/90 md:text-xl/relaxed">
                                    Join the growing community of African NGOs enhancing their impact through continuous learning.
                                </p>
                            </div>
                            <div className="w-full max-w-md space-y-2 pt-6">
                                <div className="flex flex-col gap-4 sm:flex-row justify-center">

                                    {
                                        !auth.user ?
                                            <Link
                                                href="/login"
                                                className="inline-flex h-12 items-center justify-center rounded-md  px-8 text-sm font-medium text-[#295da6] bg-white shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1"
                                            >
                                                Login
                                            </Link>
                                            :
                                            auth.user.role == "admin" ?
                                                <Link
                                                    href="/admin/dashboard"
                                                    className="inline-flex h-12 items-center justify-center rounded-md  px-8 text-sm font-medium text-[#295da6] bg-white shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1"
                                                >
                                                    Admin Dashboard
                                                </Link>

                                                :

                                                <Link
                                                    href="/dashboard"
                                                    className="inline-flex h-12 items-center justify-center rounded-md  px-8 text-sm font-medium text-[#295da6] bg-white shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1"
                                                >
                                                    Dashboard
                                                </Link>

                                    }
                                    <a
                                        target="_blank"
                                        href="https://youthempowermentsummit.africa/contact"
                                        className="inline-flex h-12 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:/10 focus-visible:outline-none focus-visible:ring-1"
                                    >
                                        Contact Us to Join <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t ">
                <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between md:py-16 px-6 md:px-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-6 w-6 text-[#295da6]" />
                            <span className="text-lg font-bold">Yes Learning</span>
                        </div>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Empowering NGOs across Africa through education and capacity building.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:flex-row md:gap-8">
                        <Link href="#" className="text-sm hover:text-[#295da6] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm hover:text-[#295da6] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm hover:text-[#295da6] transition-colors">
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Yes Learning. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
