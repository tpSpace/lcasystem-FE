import { useEffect } from "react";
import { useRouter } from "next/router";
import { PATH_APP } from "../../../routes/paths";

export default function UserIndex() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_APP.user.root) {
      push(PATH_APP.user.all);
    }
  }, [pathname, push]);

  return null;
}
