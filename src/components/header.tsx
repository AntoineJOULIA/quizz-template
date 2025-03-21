import Link from "next/link";

export function Header() {
  return (
    <header className="p-8">
      <nav>
        <ul className="flex gap-8 justify-center items-center">
          <li>
            <Link className="text-xl opacity-70 md:text-2xl lg:text-3xl p-4 hover:opacity-100" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-xl opacity-70 md:text-2xl lg:text-3xl p-4 hover:opacity-100" href="/board">
              Progression
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
