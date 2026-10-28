/* Label letter spacing (`tracking-label`) sits after every character —
   including the last one. That space belongs to the text box: centered
   labels shift left by half the tracking, right-aligned ones do not sit
   flush with the edge, and underlines overhang the last character. The
   last character therefore gets `tracking-normal`; the spacing between
   characters stays untouched. */
export function trimTrailingTracking(text: string) {
  const chars = Array.from(text);
  const last = chars.pop();
  if (last === undefined) return text;

  return (
    <>
      {chars.join("")}
      <span className="tracking-normal">{last}</span>
    </>
  );
}
