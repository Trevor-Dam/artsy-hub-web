import Image from "next/image";
import logo from "@/../public/logo.png";
export default function HeaderComponent() {
    return (
        <header className="bg-white text-black p-4">
            <Image src={logo} alt="Artsy Hub Logo" width={50} height={50} />
        </header>
    );
}