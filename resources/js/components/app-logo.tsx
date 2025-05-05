import AppLogoIcon from './app-logo-icon';

export default function AppLogo({className}: { className?: string }) {
    return (
        <>

            <img className={`w-30 ${className}`} src="/assets/images/yes-learning.png" alt="" />
            <div className="ml-1 grid flex-1 text-left text-sm">
                {/* <span className="mb-0.5 truncate leading-none font-semibold">Yes Learning</span> */}
            </div>
        </>
    );
}
