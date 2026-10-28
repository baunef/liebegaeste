import Lettering from "@/components/Lettering";
import { site } from "@/content/site";
import monogram from "@/public/images/monogram.svg";

export default function Wordmark() {
  return (
    <Lettering image={monogram} label={`${site.nameA} & ${site.nameB}`} className="w-60" />
  );
}
