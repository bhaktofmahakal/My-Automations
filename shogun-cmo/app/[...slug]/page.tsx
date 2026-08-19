import { ProductApp, MarketingPage } from "../product-app";
import { type View, viewFromPath } from "../../lib/routes";

type RouteProps = { params: Promise<{ slug: string[] }> };

function pathnameFor(slug: string[]) {
  return `/${slug.join("/")}`;
}

export default async function RoutedProductPage({ params }: RouteProps) {
  const { slug } = await params;
  const pathname = pathnameFor(slug);
  const publicSections = new Set(["product", "solutions", "resources", "pricing", "login", "signup", "demo"]);
  if (slug.length === 1 && publicSections.has(slug[0])) return <MarketingPage section={slug[0]} />;
  const view = viewFromPath(pathname);
  const parts = slug;
  const initialOpportunityId = view === "opportunity" && parts[0] === "opportunities" ? parts[1] : undefined;
  const initialCampaignId = view === "campaign" && parts[0] === "campaigns" ? parts[1] : undefined;
  return <ProductApp initialView={view as View} initialOpportunityId={initialOpportunityId} initialCampaignId={initialCampaignId} />;
}
