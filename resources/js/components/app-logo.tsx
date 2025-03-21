import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
           
            <img className='w-10' src="/assets/images/logo.svg" alt="" />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Yes Learning</span>
            </div>
        </>
    );
}
