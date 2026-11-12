import { useEffect } from "react";

const SITE_NAME = "Tienda Creativa";

export default function usePageTitle(pageName) {
  useEffect(() => {
    document.title = `${pageName} | ${SITE_NAME}`;
  }, [pageName]);
}