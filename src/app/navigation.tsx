import Link from "next/link"
type Props = {
  open: boolean;
};

export default function Navigation({ open}: Props) {
  return (
    <nav
    className={`navigation${open ? "" : " hidden"}`}
    >
      <ul>
        <Link href="./login"><li>ログイン</li></Link>
        <li>works</li>
        <li>contact</li>
      </ul>
    </nav>
  );
}