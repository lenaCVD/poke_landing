export default function Nav() {
    const links = [
        { label: "Landing Page", href: "/" },
        { label: "Poke Search", href: "/pokesearch" },
        { label: "All Pokes", href: "/allpokes" },
    ];

    return (
        <nav className="flex justify-between items-center px-6 py-5 border-b border-black/10">
            <span className="text-sm tracking-widest uppercase text-gray-400">
                Andrea Vargas
            </span>
            <ul className="flex gap-8 list-none">
                {links.map((link) => (
                    <li key={link.href}>

                        <a
                            href={link.href}
                            className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}