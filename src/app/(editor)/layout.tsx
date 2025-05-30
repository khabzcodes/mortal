import "@/styles/prosemirror.css";
// import "katex/dist/katex.min.css";
import "@/styles/_keyframe-animations.scss";
import "@/styles/_variables.scss";

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden">{children}</div>;
}
