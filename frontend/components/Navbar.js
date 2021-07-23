import Link from "next/link";

export function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/wgs/">
            <a>WGS</a>
          </Link>
        </li>
        <li>
          <Link href="/vcf/">
            <a>VCF</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
