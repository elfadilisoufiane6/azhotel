import { site } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const number = site.whatsapp.replace(/[^\d]/g, "");
  const text = encodeURIComponent(
    `Hello AZ Hôtel des Arts, I'd like to enquire about a stay.`
  );
  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-[5.25rem] right-4 lg:bottom-6 lg:right-6 z-40 size-12 lg:size-14 rounded-full bg-[#25D366] text-white shadow-luxe hover:scale-110 transition-transform flex items-center justify-center"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <MessageCircle className="size-6 lg:size-7" />
    </a>
  );
}
