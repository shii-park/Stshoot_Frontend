type Props = {
  open: boolean;
};

export default function Navigation({ open}: Props) {
  return (
    <nav
    className={`navigation${open ? "" : " hidden"}`}
    >
      <ul>
        <li>about</li>
        <li>works</li>
        <li>contact</li>
      </ul>
    </nav>
  );
}