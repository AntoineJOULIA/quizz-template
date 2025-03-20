import Link from "next/link";

export function Header() {
  return (
    <header className="p-8">
      <nav>
        <ul className="flex gap-8 justify-center items-center">
          <li>
            <Link className="text-xl md:text-2xl lg:text-3xl p-4 hover:text-primary" href="/">
              Accueil
            </Link>
          </li>
          <li>
            <Link className="text-xl md:text-2xl lg:text-3xl p-4 hover:text-primary" href="/board">
              Progression
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
