/** `tel:` link for a phone number written with spaces for readability. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
