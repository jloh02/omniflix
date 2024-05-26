import { LOGIN_PAGE_ROUTE } from "@/utils/constants";
import Link from "next/link";

export default async function LoginButton() {
  return (
    <Link
      href={LOGIN_PAGE_ROUTE}
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
