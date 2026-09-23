"use client";

import { useState } from "react";
import { Check, Facebook, Link2, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const url = new URL(path, site.url).toString();
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const btn =
    "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-[15px] font-semibold text-radiograph hover:border-ward hover:text-ward";
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[15px] font-semibold text-radiograph">Share:</span>
      <a className={btn} href={`https://wa.me/?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
      </a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer">
        <Facebook className="h-4 w-4" aria-hidden /> Facebook
      </a>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked */
          }
        }}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
