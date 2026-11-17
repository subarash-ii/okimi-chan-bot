export default function escapeHtml(name: String): String {

  const safeName = name
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return safeName;

}
