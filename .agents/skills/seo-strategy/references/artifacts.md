# SEO Growth Strategy - Frameworks, Templates & Checklists

*59 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### AI Content Creation Usage Guide (Ethan Smith: The power of internal linking for SEO)
Guidelines for where AI tools like ChatGPT should and should not be used in the content creation workflow

How it works: USE AI FOR (pre-writing tasks):
- Extracting structure for articles
- Identifying topics and subtopics
- Performing keyword research

DO NOT USE AI FOR:
- Writing the actual content itself

Reasoning: While AI-generated text is often indistinguishable from human writing, the core problem is factual accuracy. GPT models work by crawling large data sets and generating similar sentences, which may or may not be accurate. Google's algorithm places higher value on quality, relevant content, so inaccuracies hurt site performance. More critically, unreliable information can harm users (e.g., medical advice).

### End-to-End SEO Flow (Cam Adams)
A strategy mapping search intent directly to product activation.

How it works: 1. Identify top JTBDs (e.g., 'Halloween poster'). 2. Rank for query. 3. Landing page shows product capability. 4. CTA button drops user directly into a customizable template. 5. User customizes and downloads.

### Four Benefits of Internal Linking for SEO (Ethan Smith: The power of internal linking for SEO)
A framework explaining why internal links matter, useful for building a business case for investing in internal linking

How it works: 1. Teach search engines about your website's structure — Internal links allow search engine crawlers to index your site's pages more effectively by showing how content is interconnected. Helps search engines understand the hierarchy of your content.

2. Distribute link equity — When you link to another internal page, you pass some authority and credibility of the original page to the linked resource. This distributes 'link juice' throughout your site.

3. Improve the user experience — Internal links help users navigate more easily, improving UX and enticing visitors to stay longer. High-quality experience increases engagement, social shares, and backlinks.

4. Help target specific keywords — By linking to pages targeting a specific keyword, you signal to search engines which pages are most relevant for those search queries. Engines prioritize credibility and relevance, putting stronger content on SERPs.

### Four Types of SEO-Driven Product-Led Marketing (Product-led marketing)
A taxonomy of four organic search strategies specifically designed for PLG products

How it works: 1. Free Sidecar Products: Build standalone free tools designed to attract high-intent users to your core product. Key traits: regularly updated, no paywall, clear CTA to core product, can include user-generated content. Examples: Snyk Vulnerability Database, HubSpot Website Grader, Ahrefs Backlink Checker.

2. Templates tied to user JTBD: Pre-built templates for each use case with SEO-optimized landing pages. Key traits: show product value in user's own language, help with activation, can be community-sourced or monetized. Examples: Airtable (200+ templates), Notion Template Gallery, Miro Templates, SurveyMonkey Templates.

3. Programmatic 'How To' Landing Pages: Thousands of pages generated from combinations of use cases. Key traits: minimal content per page, massive scale, immediate value to visitor, signup nudge for more. Examples: Zapier (70,000+ pages), Similarweb (per-website traffic pages), Grammarly grammar FAQ pages.

4. Product Education & Documentation: Optimize existing docs for SEO and build curated hubs around high-search-volume product pillars. Key traits: well-organized, interactive content, regularly updated, strong CTAs. Examples: Cypress docs, Hotjar heatmaps hub (#1 ranking), Ahrefs keyword research guide, Shopify e-commerce guide.

### HubSpot's Content TAM Model (Content-driven growth)
A method for estimating the total addressable market of search traffic available for your content topics on a quarterly basis

How it works: Steps to model content ROI:
1. Identify topic clusters you plan to cover in the quarter
2. Research available search volume for those topics using keyword research tools
3. Calculate net new search traffic available (total search volume minus what you already capture)
4. This becomes your quarterly TAM — the ceiling of new traffic you can acquire
5. Apply rough conversion rates (visitor → lead → customer) to estimate demand generation
6. Compare estimated demand to your overall demand needs (e.g., 'Can content drive 20% of required demand?')
7. Monitor for diminishing returns: track when you're 'running out of net new traffic' on certain topics
8. Have a team monitoring posts that are declining in traffic and optimizing them to maintain/improve performance

### Long-Tail Keyword Formula Approach (Winning at SEO)
Method for identifying and targeting long-tail keyword formulas instead of head terms.

How it works: Instead of targeting competitive head terms (e.g., 'flowers', 'red roses'), identify keyword formulas that combine your unique data with user intent:

Formula pattern: {your data variable} + {location/modifier}

Examples:
- Flower startup: '{flower type} for sale in {location}'
- Upsolve: 'how to file for bankruptcy in {state}'
- Thumbtack: 'best {service type} in {city}'
- Strava: '{activity type} routes in {city}'

Why this works:
- Captures specific, valuable user intent
- Higher conversion rates than head terms
- Less competitive
- Naturally scalable with programmatic page generation
- Start niche → build authority → expand to new keyword spaces

Validation: Use Google Keyword Planner (free), SEMRush ($), or Ahrefs ($) to check search volumes for your keyword formulas.

### Programmatic SEO Strategy Framework (Winning at SEO)
A three-question framework for building a scalable SEO strategy from scratch, designed to help early-stage companies compete with incumbents.

How it works: Core strategy: Create many valuable web pages in a scalable and cheap way.

Three questions to answer:
1. What kind of pages should I create?
   - List all unique data points your business has access to
   - Ask: What are people searching for that my business is uniquely able to answer?
   - Target long-tail keyword formulas (e.g., '{flower type} for sale in {location}')
   - Use keyword tools to validate search volume
   - Start niche, expand as authority grows

2. How do I create these pages programmatically?
   - Treat each page as a Mad Libs template
   - Fill templates with internal and publicly available data
   - Sketch your ideal page with all available data points
   - Audit data coverage: create a spreadsheet mapping data points to each page variant
   - Handle worst-case scenarios: bootstrap missing data via APIs (e.g., Yelp), show nearby data, or noindex low-quality pages

3. What features do I need for Google to love each page?
   - Title tags (most important SEO tag)
   - Internal linking (most overlooked feature)
   - Robots.txt configuration
   - Server-side HTML rendering
   - Schema markup

### SEO Experimentation Framework (Page-Level A/B Testing) (How to run SEO experiments)
A framework for running SEO experiments by bucketing at the page level instead of the user level, measuring organic traffic as the single success metric, and using difference-in-difference analysis

How it works: Core principles: 1) Bucket at the PAGE level, not user level — Google counts as a different user each crawl and needs consistent experience. 2) Hash the canonical URL to assign pages to treatment/control, or manually assign for smaller sites. 3) Measure ONLY organic traffic as success metric (not rankings, GSC data, or conversions). 4) Use a visitors table logging every incoming visit and referral — NOT Google Analytics (which is sampled). 5) Roll out to entire website (not just mobile or desktop separately). 6) Run one experiment at a time unless you have massive traffic. 7) Let experiments run 2-4 weeks for Google to discover and adjust. 8) Analyze using difference-in-difference: compare expected change in traffic (control) vs actual change (treatment) to account for imbalanced traffic distribution. 9) Exclude bot traffic by filtering user agents (Googlebot, Bingbot, DuckDuckGo, etc). 10) Conclude after 2+ weeks when results are statistically significant. Prerequisites: thousands of programmatically generated pages, at least 5,000 organic visitors/day to the page type being tested, organic traffic already a main business driver.

### SEO Experimentation Readiness Assessment (How to run SEO experiments)
Criteria to determine whether your company should invest in building an SEO experimentation framework

How it works: Prerequisites (must have all): 1) Familiar with SEO fundamentals, 2) Organic traffic is already a main driver of your business, 3) You have thousands of programmatically generated pages, 4) At least 5,000 organic visitors/day to the page type you want to test. When to build: (a) You're in the OPTIMIZATION phase of your SEO strategy (not the build phase), (b) Leadership wants to account for every feature and team success is tied to proving incremental wins. When NOT to build (95% of startups): You're still in the 'build' phase — don't know what pages to create, current pages aren't built correctly, lack internal linking, don't have decent title tags. Don't waste time validating foundational SEO features experimentally. Traffic limitations: Number of pages limits concurrent experiments — Airbnb could run ~5 at a time, Strava limited to 1. Be careful about testing on page types with marginal traffic (e.g., Strava user profiles had to dump data due to skewed results).

### SEO Keyword Prioritization via Paid Testing (SEO keywords, career ladders, backlog tools, copywriting, OnlyFans, AMA with Pete Kazanjy and much more)
A tactic to prioritize SEO keywords by first running paid AdWords campaigns to test conversion rates, then building organic content for the highest-converting keywords.

How it works: Steps: 1) Identify your target keyword list (e.g. 50 keywords). 2) Run paid AdWords campaigns for each keyword. 3) Measure conversion rates — which keywords bring in high-quality customers. 4) Rank keywords by conversion quality. 5) Build SEO-optimized pages for the top-converting keywords to capture traffic organically without paying for it. This approach de-risks SEO investment by using paid data as a proxy for organic value.

### SEO Myths Debunked (Winning at SEO)
Four common SEO misconceptions that waste time for early-stage companies.

How it works: Myth 1: You need to build backlinks.
Reality: Don't worry about backlinks. They're probably not holding you back and unlikely to be a game-changer.

Myth 2: It'll take 6 months for SEO to work.
Reality: Closer to 3 months, and if you're in the right space doing things right, you'll see progress within a month.

Myth 3: You need to hire a full-time SEO to get it right.
Reality: You don't, especially as a small startup with complete site control. Find a trustworthy consultant, have them meet with your engineering team. Some of the most impactful features came from designers and engineers.

Myth 4: There's no way to run SEO experiments.
Reality: You can — reference Airbnb's SEO experimentation framework and GrowthEngBlog's guide. But just because you can doesn't mean you should. If SEO isn't in good shape, just ship improvements.

### Three Types of SEO Framework (Ethan Smith: The power of internal linking for SEO)
A categorization of all SEO work into three distinct types, helping teams understand where internal linking fits and where to allocate resources

How it works: 1. Programmatic SEO — The production of product pages, landing pages, and other web pages automatically generated from a database of information.

2. Editorial SEO — Articles, guides, and other content generated manually (written by a person) instead of automatically. Ethan argues this is underappreciated and has become more effective at driving traffic than programmatic SEO.

3. Technical SEO — A website's infrastructure, including site architecture, internal link architecture, category pages, tags, redirects, and page speed.

Internal links span both editorial and technical SEO.

### Top-Down SEO TAM Forecast Model (Eli Schwartz)
A formula for forecasting SEO revenue based on market size rather than keyword volume.

How it works: Total population -> Filter by target demographic -> Filter by % who buy online -> Apply expected market penetration -> Multiply by Average Order Value (AOV).

### Traffic Light System for Keyword Prioritization (Meltem Kuran)
A method for prioritizing up to 700 SEO keywords based on search volume and user intent.

How it works: Green = high intent (ready to buy), Yellow = 50/50 intent (might buy later), Red = low intent (e.g., students researching). Sort each color bucket by highest to lowest search volume and execute in that order.

### Two Types of Internal Links (Ethan Smith: The power of internal linking for SEO)
Classification of internal links into contextual and navigational, with guidance on SEO value of each

How it works: 1. Contextual Links — Hyperlinks within the body of a website's content (e.g., blog posts) that lead to another page on the same site. They drive deeper engagement by encouraging visitors to explore related topics and spend more time on your site. More valuable for SEO because they connect pages and deepen context.

2. Navigational Links — Menu links in a website's header, footer, or sidebar that allow users to quickly find other pages. They help users easily move through your website to find content they seek.

Both types should be included in your internal linking strategy to create a site that's informative, easy to navigate, and optimized for search engines.

## Templates

### AEO Control/Test Experiment Design (Ethan Smith)
A structure for testing if an AEO intervention actually works.

How it works: Take 200 questions. 100 as control (do nothing). 100 as test (e.g., comment on Reddit, make a video). Track for a couple of weeks before and after. Compare test vs control. Reproduce multiple times to verify.

### Programmatic SEO Page Data Audit Spreadsheet (Winning at SEO)
A spreadsheet template for auditing what data you have for each page variant to assess quality and identify gaps before generating pages at scale.

How it works: Columns:
- Page variant (e.g., 'Roses in San Francisco', 'Roses in Fresno')
- Data Point 1 (e.g., Header text) — Yes/No
- Data Point 2 (e.g., Flower arrangements) — Yes/No
- Data Point 3 (e.g., Local flower shops) — Yes/No
- Data Point 4 (e.g., Delivery availability) — Yes/No
- Data Point 5 (e.g., User reviews) — Yes/No
- Data Point 6 (e.g., Price range) — Yes/No
- Data Point 7 (e.g., Seasonal availability) — Yes/No
- Data Point 8 (e.g., Photos) — Yes/No
- Data Point 9 (e.g., Related products) — Yes/No
- Total data points available (count)
- Quality assessment (Strong/Weak)
- Action: Publish / Bootstrap data / Noindex

For each weak page, identify which data can be bootstrapped (e.g., Yelp API for local shops, nearby city data as fallback, programmatic content generation from available data).

### Programmatic SEO Page Wireframe (Petal to the Metal Example) (Winning at SEO)
A sketch/wireframe template for designing a programmatic SEO page that captures long-tail keywords using templatized data.

How it works: Page structure for '{flower type} in {city name}' keyword space:
- H1: {Flower Type} in {City Name}
- Section 1: Overview / description of {flower type} availability in {city}
- Section 2: Flower arrangements featuring {flower type}
- Section 3: Local flower shops in {city} that carry {flower type}
- Section 4: Pricing / delivery information
- Section 5: User reviews / ratings
- Section 6: Photos / images
- Section 7: Related flowers in {city} (internal links)
- Section 8: {Flower type} in nearby cities (internal links)
- Title tag: '{Flower Type} in {City Name} - Petal to the Metal'

Key design principles:
- Every section is a data-driven 'Mad Libs' slot
- Template generates hundreds/thousands of pages from one design
- Plan for best case (SF with rich data) AND worst case (Fresno with sparse data)
- Noindex pages that fall below minimum quality bar
- Leverage UGC where available for natural, keyword-rich content

## Checklists

### 3-Step Product-Led SEO Process (Eli Schwartz)
A step-by-step approach to launching a product-led SEO strategy.

How it works: 1. Be the user and understand what they search for. 2. Decide what asset to create (e.g., programmatic vs. editorial). 3. Envision and build the product using design, engineering, and PM resources.

### 5-Step SEO Experiment Execution Checklist (How to run SEO experiments)
Step-by-step process for running a single SEO experiment from setup to conclusion

How it works: Step 1: SET UP PREREQUISITES — (a) Build ability to bucket treatment/control on page level (hash canonical URL or manually pick URLs), (b) Build ability to track incoming organic traffic accurately via a visitors table (not Google Analytics — it's sampled). Step 2: DESIGN AND ROLL OUT — (a) Bucket treatment/control pages, (b) Run one experiment at a time unless you have tons of traffic, (c) Roll out to entire website (all versions — mobile and desktop — so all versions of Googlebot see the experiment). Step 3: WAIT 2-4 WEEKS — Let Google discover changes and make adjustments. SEO experiments take longer than typical A/B tests. Step 4: RUN DIFFERENCE-IN-DIFFERENCE ANALYSIS — Compare expected change in traffic (control) vs observed change (treatment). This accounts for imbalance in raw traffic between buckets. Pull out bot traffic by excluding known bot user agents. Step 5: CONCLUDE — After 2+ weeks if statistically significant: positive → launch to 100%; neutral/inconclusive after a month → use judgment on whether to ship.

### 7-Step Answer Engine Optimization (AEO) Process (Ethan Smith)
A step-by-step guide to ranking in LLMs.

How it works: 1. Figure out questions (use paid search data + ChatGPT). 2. Track them in an AEO tracker. 3. Analyze who shows up in citations. 4. Make landing pages answering follow-up questions. 5. Execute offsite strategies (affiliates, YouTube, Reddit). 6. Run controlled experiments. 7. Build a team (SEO + community marketing).

### Brian Ta's SEO Prioritization Checklist for New Sites (SEO keywords, career ladders, backlog tools, copywriting, OnlyFans, AMA with Pete Kazanjy and much more)
Contrarian SEO advice for startups with low domain authority, emphasizing content quality over backlinks and domain authority.

How it works: Key principles: 1) Don't focus on domain authority — it's a made-up metric from tools like Ahrefs, not what Google uses. You'll build it over time. 2) Forget backlinks — no proven positive correlation between backlink investment and organic traffic growth that can be directly attributed to backlinks. 3) SEO can pay off in as little as 1 month; if no results in 3 months, revisit strategy. 4) Use the 'eye test' — if competing content looks bad and you can create something better, target that keyword. 5) Target keywords under 1,000 search volume first; once proven, go after higher volume. 6) Lower volume / longer tail keywords lead to higher conversions (e.g. 'flower shop' vs 'where to buy flowers in Burbank'). 7) High-quality content is what makes you win; everything else is secondary. 8) Make sure your site has its SEO technical foundations set.

### Content Experiment Ideation Prompts (How to run SEO experiments)
Two questions to generate content-based SEO experiment ideas

How it works: Ask when brainstorming content experiments: 1) How do I leverage existing content that I already have, and repackage it to be useful on my landing page? 2) Can I remove low-quality pieces of content on the page and replace them with something higher quality? (Example: remove low word count reviews and replace with keyword-dense, lengthy, high-quality reviews.)

### Ethan's 4-Step Internal Linking Strategy Guide (Ethan Smith: The power of internal linking for SEO)
A step-by-step process for building an internal linking strategy from scratch, applicable to any website looking to improve SEO

How it works: Step 1: Perform a site audit — Use a tool like Screaming Frog to crawl your site and pull data for an internal link audit. Learn total number of internal links, find broken links (leading to error pages), and gain performance metrics showing which pages need improvement.

Step 2: Identify your best-performing pages — Your audit will show a small percentage of pages bringing in most traffic. These high-authority pages are 'crawl points' — locations where Google enters your site. A page's proximity to a crawl point influences its share of link juice. Goal: find the shortest path from a crawl point.

Step 3: Identify related content — Look for existing or new content that is relevant to your best-performing pages. These internal resources can benefit one another through linking.

Step 4: Link related content to the best-performing pages — Use internal links to connect pages. Aim for at least 5–10 links per page. Use descriptive anchor text that's relevant to the content it's linked to.

### Help Center AEO Checklist (Ethan Smith)
Steps to optimize a help center for long-tail LLM queries.

How it works: 1. Move from subdomain to subdirectory. 2. Implement robust cross-linking between articles. 3. Create content for the 'tail' (obscure use cases, integrations). 4. Open to community Q&A to fill content gaps.

### Internal Linking Best Practices (Ethan Smith: The power of internal linking for SEO)
Key rules of thumb for implementing internal links effectively

How it works: - Include at least 5–10 internal links per page
- Use descriptive anchor text that's relevant to the content it's linked to
- Aim for the shortest path from a crawl point to any given page
- Include both contextual links (in-body) and navigational links (header/footer/sidebar)
- Fix broken links found during your site audit
- Link low-traffic pages to high-authority pages that already rank well
- More than 90% of websites are not properly utilizing internal links — there is likely significant opportunity on your site

### On-Page SEO Fundamentals Checklist (Winning at SEO)
Five essential on-page SEO features every page needs to rank well in Google.

How it works: 1. Title Tags: Have a relevant and unique title tag on every single page. This is the most important SEO tag. Use your target keyword space. Primary lever for optimization if pages aren't performing.

2. Internal Linking: Add links on each page pointing to other pages on your domain. Google uses internal links to determine hierarchy of information and discover new pages. More internal links = more important page. Typical solutions: recommended products, nearby locations, 'other {thing} people liked.'

3. Robots.txt: Configure to tell crawlers where they can and cannot crawl. Block pages that don't bring valuable traffic (e.g., user profile pages). Google has finite crawl budget — focus it on pages that matter.

4. JavaScript Rendering: Serve logged-out pages server-side in plain HTML. Google reads plain HTML most easily. Don't make Google do extra work to render your content. Save JavaScript rendering for post-login experience.

5. Schema Markup: Add structured data for rich search result features (stars, inventory, review counts). Reference Google's official search gallery documentation for available enhancements.

### SEO Opportunity Assessment (3-Checkbox Framework) (Yuriy Timen)
Back-of-envelope framework to evaluate whether a company should invest in SEO, requiring at least 2 of 3 criteria to be met

How it works: Three checkboxes: 1) Unique editorial angle - Do you have something unique to contribute to how-to searches and existing information landscape? 2) Unique programmatic angle - Can you create programmatic SEO pages (like Canva templates, Zillow listings, Reddit threads)? 3) Unique data angle - Do you have proprietary user data that could be turned into valuable organic search experiences? If you check 2 of 3, you may be in good shape. Time-box experiment to 3 months to assess viability.

### SEO Readiness Checklist (EOY Review)
Criteria to evaluate if a company has enough authority and market size to invest in SEO.

How it works: 1. Current non-SEO traffic is at least ~1,000 visits/day (check via SimilarWeb). 2. Domain has at least ~1,000 referring domains (check via Ahrefs/Semrush). 3. Addressable market is large, validated by checking the traffic of 'audience competitors' (e.g., Investopedia for Robinhood).

### SEO Strategy Tips and Reminders (Winning at SEO)
Six final tips for maintaining an effective SEO strategy.

How it works: 1. Not all keyword spaces are winnable. Know which ones aren't (e.g., travel), and hold off until you're further along.
2. Create pages that are niche, and once you have a foothold go up the funnel.
3. SEO is creating high-quality content at scale. Maintain that minimum quality bar, and do it cheaply.
4. Simple is better. Don't overcomplicate.
5. Traffic is a vanity metric. Traffic that converts is what you're after.
6. The faster your site is, the better. Users and Google both prefer fast websites.

### Title Tag Experiment Ideation Prompts (How to run SEO experiments)
Four questions to generate title tag experiment ideas based on Brian Ta's experience at Airbnb

How it works: Ask these questions when brainstorming title tag experiments: 1) Can you leverage structured content to provide more consistent title tags? (e.g., use tags, categories, or metadata instead of free-text descriptions) 2) How do you provide more context to Google about what the page is? 3) What information are people looking for when they're searching for your high-performance keywords? 4) Can you include numbers? People really like clicking on numbers in search results.

### What NOT to Measure in SEO Experiments (How to run SEO experiments)
A list of metrics that seem useful but are unreliable for SEO experiment analysis, with reasons why

How it works: DO NOT use these as primary success metrics: 1) KEYWORD RANKINGS — Rankings change daily, vary by location, tools aren't accurate enough for experimental conclusions. 2) AVERAGE RANKING (from Google Search Console) — Data is heavily sampled, heavily skewed the more pages you have (more pages = more low-quality keyword rankings that skew the average). 3) SERP CLICKS (from Google Search Console) — Data is heavily sampled; useful for directionality only, not for experiment decisions. 4) CONVERSIONS — You're testing SEO changes not UX changes. DO set up conversions as a counter metric to ensure you're not tanking conversion rate, but not as success criteria. ONLY MEASURE: Incoming organic traffic from your own visitors table (not Google Analytics, which is sampled).

## Examples

### Airbnb and Strava SEO Experiment Results (How to run SEO experiments)
Real impact data from SEO experiments run at Airbnb and Strava across title tags, content, and meta descriptions

How it works: 1) TITLE TAGS at Airbnb: In aggregate, led to 15-20% increase in traffic. A minor title tag change was the single most impactful SEO experiment ever run at Airbnb. Tips: leverage structured content for consistent title tags, provide more context to Google, match what people search for on high-performance keywords, people like clicking on numbers. 2) CONTENT at Strava: Most impactful single experiment increased traffic by 20%. Change: added more routes to 'Where to run in {city}' pages. Tips: leverage and repackage existing content, replace low-quality content (e.g., low word count reviews) with keyword-dense, lengthy, high-quality content. 3) META DESCRIPTIONS at Airbnb: In aggregate, led to 6% increase in traffic. Meta descriptions don't directly affect ranking but affect CTR on SERPs, which leads to more traffic, which leads to higher rankings.

### Airtable Growth Inflection: SEO Templates (Growth inflections)
How templates became Airtable's biggest growth unlock, accounting for a third of total site traffic

How it works: Adding templates was one of the biggest inflection points for Airtable's growth. It kicked off the SEO flywheel and accounted for as much as a third of total site traffic at its peak. Key element: templates were seeded with content made by creators in the community. This is considered the biggest unlock of all time for Airtable's growth engine.

### Airtable's 200+ Template Library (Template Marketing) (Product-led marketing)
How Airtable uses templates to attract diverse user segments through SEO

How it works: Airtable created 200+ pre-built templates around popular jobs-to-be-done. Key elements:
- Each template has its own SEO-optimized landing page
- Templates translate abstract product value ('low-code app builder') into user language ('content calendar', 'campaign tracker')
- No-brainer CTA: simply 'use template'
- Templates serve dual purpose: attract new users via SEO AND help users activate quickly
- Users feel the product was 'purposely built for them'
- Can evolve into community strategy (Miro's Miroverse sources templates from power users; Notion lets users monetize templates)

### Canva's Long-Tail SEO Growth Loop (Yuriy Timen)
Canva's initial primary growth engine was long-tail programmatic SEO targeting template and design project keywords

How it works: Canva targeted two categories of keywords: 'make keywords' (designing X) and 'template keywords' (X template, e.g., wedding invitation template). Built programmatic pages for every design project type. This was their biggest initial growth loop. Incredibly strong SEO that capitalized on all long-tail traffic. Later needed to diversify away from SEO risk (Google algorithm updates).

### Companies Where SEO Is the Primary Growth Engine (How to run SEO experiments)
List of major companies where SEO drives primary growth, referenced from First Round Capital's customer acquisition playbook

How it works: Companies where SEO is the primary growth engine: Pinterest, Thumbtack, Expedia, Wayfair, Canva, Glassdoor. Source: First Round Capital's 'Drive Growth by Picking the Right Lane' playbook (https://firstround.com/review/drive-growth-by-picking-the-right-lane-a-customer-acquisition-playbook-for-consumer-startups/).

### Figma Community Title Tag Experiment (Walkthrough) (How to run SEO experiments)
A detailed hypothetical SEO experiment designing and testing new title tags for Figma's Community File pages

How it works: Scenario: Growth PM at Figma on the Community team, wanting to grow organic traffic to Community pages. Current title tag structure: '{name of file | description of file that gets truncated}'. Actual example: '<title>Figma - iOS & iPadOS 14 UI Kit for Figma | <p>Excited to share the latest iOS &amp; iPadOS 14 UI Kit for Figma!</p><p><br></p><p>---</p><p><...</title>' — Problems: description gets truncated cutting off keywords, HTML is injected into title tags. Proposed title tag: '{name of file | tags}'. Example: '<title>Figma - iOS & iPadOS 14 UI Kit for Figma | 14, alert, apple, dark, emoji, ios, iphone, kit, light</title>'. Reasoning: Tags are structured content that provide more keyword context without truncation issues. Experiment design: 50/50 A/B test on ALL Community File pages. Wait 2 weeks (title tag experiments are usually impactful quickly). Analyze difference-in-difference in organic traffic using visitors table data. If positive and significant → launch to 100%. Iteration ideas: only add most popular tags, combine tags and description.

### Graphite Client Examples (Ethan Smith: The power of internal linking for SEO)
Real companies that used SEO and internal linking strategies with measurable success

How it works: Companies mentioned as Graphite clients that leveraged SEO for growth:
- MasterClass
- Medium
- Upwork

All are described as 'hugely successful companies that knew search engines like Google and Bing could play a significant role in their growth' and turned to Ethan Smith's agency Graphite for programmatic SEO, content strategy, and growth design.

### Hotjar's Product Education Hubs (SEO Dominance) (Product-led marketing)
How Hotjar built curated content hubs around product features to dominate organic search rankings

How it works: Hotjar built curated hubs around key product pillars like heatmaps and session recordings. Results:
- #1 organic search result for 'heatmaps', 'heatmap tool', and 'heatmaps guide'
- Strategy: Address high-level visitor intent ('What is a heatmap?'), challenge the visitor's question and raise the stakes, address a broad range of related questions
- Break down detailed and complex topics into bite-size, digestible chunks
- Goes 'on offense' beyond basic documentation

### Monarch Money Data-Driven SEO Opportunity (Yuriy Timen)
Personal finance app Monarch Money exploring SEO based on unique user spending pattern data from connected accounts

How it works: Monarch Money (new/improved Mint alternative) has users connecting financial accounts, giving them unique spending pattern data. This represents the 'unique data angle' checkbox in the SEO assessment framework - proprietary data that could be turned into valuable organic search experiences.

### OpenTable's SEO Rapid Growth (Accelerating Growth at Scale 🔥 Phase 2 of Kickstarting and Scaling a Marketplace Business)
How OpenTable tripled SEO referrals within months by bringing in an outside expert

How it works: OpenTable was late to SEO but once they understood its importance, they invested fairly heavily. They brought in an outside expert who helped launch their SEO program. Within a few months they had tripled their SEO referrals and it quickly became a big source of new users.

### Pinterest Growth Inflection: SEO Funnel Mastery (Growth inflections)
How Pinterest potentially 100x-1000x'd traffic through world-class SEO execution

How it works: The biggest unlock was doubling down on the entire SEO funnel, including SEO work AND signup/login conversion optimization. Pinterest became world-class at SEO, making it their primary acquisition channel and one of two main re-engagement channels (along with notifications). The amount of free traffic from Google each day was described as 'quite insane.' They may have 100x'd or 1,000x'd SEO traffic.

### Similarweb's Per-Website Traffic Analysis Pages (Product-led marketing)
How Similarweb uses programmatic landing pages built around website traffic data to attract 10M monthly visitors

How it works: Similarweb attracts nearly 10M website visitors per month. Key strategy:
- Free, ungated, SEO-friendly landing pages built for nearly every website
- Each page includes: company background, traffic ranking vs. other websites, traffic insights
- Gets found for hyper-specific searches (e.g., 'Google traffic ranking', 'openviewpartners.com website traffic')
- Provides immediate value (quick answer to visitor's question)
- Nudges visitors to sign up for free account for 'even more actionable insights'

### Snyk Advisor SEO Loop (Ben Williams)
Programmatically generated SEO pages for open-source packages that provide health scores and security data.

How it works: Indexes package managers -> Augments with Snyk security scans and repo maintenance data -> Generates a package health score -> Ranks highly on Google for package searches -> Includes CTAs to sign up for Snyk to secure applications perpetually.

### Snyk's Open Source Vulnerability Database (Sidecar Product) (Product-led marketing)
A sidecar product example showing how Snyk built a free tool specifically for marketing purposes

How it works: Snyk built security.snyk.io — a comprehensive database of open source vulnerabilities across apps and operating systems. Key design elements:
- Rich content exposed to organic search, discoverable in developer workflows
- Regularly updated as new vulnerabilities are found (drives return visits)
- Incorporates user-generated content (visitors can disclose new vulnerabilities)
- Clear CTA to core product: 'Instead of checking vulnerabilities manually, let Snyk test all your apps and automatically fix vulnerabilities in your code'
- Demonstrates the sidecar product pattern: build something that adds real value, no paywall, then nudge to core product

### SpotAngels and Upsolve SEO Growth Results (Winning at SEO)
Real company examples of early-stage startups growing organic traffic dramatically using this programmatic SEO strategy.

How it works: SpotAngels: Grew from less than 1,000 organic visitors/month to over 250,000 after investing in a programmatic SEO strategy.

Upsolve: Non-profit that helps individuals file bankruptcy for free. Grew from less than 1,000 organic visitors/month to over 250,000. Targeted keyword space: 'how to file for bankruptcy in {state}'.

Other examples referenced:
- Strava: Popular running routes pages (e.g., SF running routes vs. Fresno — illustrates data quality variance)
- Airbnb: Unique listings as data for SEO pages
- Pinterest: User-generated images as SEO content
- Thumbtack: Programmatic pages like 'best electricians in Seattle' using pro-input data
- Nerdwallet: High-quality written content (Pulitzer Prize winners) as SEO strategy

### TikTok/Musical.ly App Store Search Optimization Hack (How the biggest consumer apps got their first 1,000 users)
How Musical.ly (later TikTok) exploited App Store search by using extremely long app names stuffed with keywords

How it works: Discovery: The App Store search engine gave more weight to the application name than to the defined keywords.

Tactic: Made the application name very long, incorporating target use cases and platforms.

Example app name: 'make awesome music videos with all kinds of effects for Instagram, Facebook, Messenger'

Result: Organic traffic came from App Store search. This was how they initially got started.

### Tinder's Local SEO Strategy (Eli Schwartz)
An SEO strategy focused on capturing users searching for 'online dating in [City]' by positioning Tinder as a local loneliness solution.

How it works: Demonstrates how to map a product's core value proposition (solving loneliness) to local search intent rather than broad, highly competitive terms.

### TripAdvisor and Zillow Programmatic SEO (Eli Schwartz)
Using large datasets to generate comprehensive pages for specific entities (hotels, homes) rather than writing editorial content.

How it works: Combines government/partner data, user-generated content, and photos to create unique, scalable pages that directly answer user intent.

### Webflow AEO Conversion Rate (Ethan Smith)
A case study demonstrating the value of LLM-driven traffic.

How it works: Webflow saw a 6X higher conversion rate from LLM traffic compared to Google Search traffic, proving that AEO leads are highly qualified.

### Zapier's 70,000+ Programmatic Landing Pages (Product-led marketing)
The canonical example of programmatic SEO for PLG, generating landing pages for every app integration combination

How it works: Zapier built a library of 70,000+ 'how to connect x + y app' landing pages. Key traits:
- Not much content needed per page — just enough to convey value and context
- Content gets multiplied to be discoverable no matter the user's context
- Each page addresses a specific integration combination (e.g., 'how to connect HubSpot + Typeform')
- Classic case of programmatic SEO at scale

### Zapier's App Integration Pages (Eli Schwartz)
A programmatic SEO strategy that created landing pages for every possible combination of app integrations.

How it works: Instead of trying to rank for 'Zapier', they created pages for 'Gmail and Salesforce integration' to capture users searching for specific mid-funnel solutions.

### Zillow's Comprehensive SEO and Content Strategy (Accelerating Growth at Scale 🔥 Phase 2 of Kickstarting and Scaling a Marketplace Business)
How Zillow built SEO as a major growth channel through comprehensive data, PR-driven links, and unique content

How it works: Zillow's SEO strategy components:
1. Leveraged PR and content groups to drive traffic and links to the site
2. Created the most comprehensive database of homes with deep details of every home in the country (not just homes for sale)
3. Continued investing in unique and valuable data (e.g., 360 tours of homes)
4. SEO was and continues to be an important channel

At scale, Zillow also added paid marketing late in their timeline but it 'made a big difference when we turned it on.'

## Tools

### Answer Trackers (Ethan Smith)
Software used to track share of voice and ranking in LLM answers.

How it works: Ethan mentions there are about 60 different answer tracking tools available. He recommends picking the cheapest one that does what you need, as they are essentially commodity tools similar to keyword trackers.

### Clearscope (Meltem Kuran)
An SEO tool used to ensure content is written at the right reading level and includes the right keywords.

How it works: Gives a letter grade (e.g., A+ or C-) based on readability and keyword optimization. Used to ensure content is simple enough for a 4th or 5th-grade reading level.

### Keyword Research Tools (Winning at SEO)
Recommended tools for validating keyword search volumes when identifying target keyword spaces.

How it works: 1. Google Keyword Planner — Free. Good starting point for search volume data.
2. SEMRush — Paid. More detailed keyword research and competitive analysis.
3. Ahrefs — Paid. Comprehensive keyword and backlink analysis.

Also referenced:
- Google's SEO Starter Guide: https://support.google.com/webmasters/answer/7451184
- Google's Search Gallery (for schema markup): https://developers.google.com/search/docs/guides/search-gallery
- Noindex tag documentation: https://developers.google.com/search/reference/robots_meta_tag
- Robots.txt guide: https://support.google.com/webmasters/answer/6062596
- Airbnb SEO experimentation: https://medium.com/airbnb-engineering/experimentation-measurement-for-search-engine-optimization-b64136629760
- GrowthEngBlog SEO basics: https://www.growthengblog.com/blog/2018/4/15/scaling-new-growth-opportunities-series-seo-basics

### Recommended SEO Experimentation Resources (How to run SEO experiments)
Three blog posts for deeper study on building SEO experimentation frameworks, from Pinterest and Airbnb engineering

How it works: 1) Jeff Chang's Growth Blog (https://www.growthengblog.com/blog/2018/4/15/scaling-new-growth-opportunities-series-seo-basics) — Jeff was one of the original growth engineers at Pinterest and Growth Tech Lead. Airbnb's framework is heavily borrowed from Pinterest. Described as 'an extremely simple version of an SEO experimentation framework' and best option to roll something out quickly. 2) Airbnb SEO Data Scientist Blog by Brian de Luna (https://medium.com/airbnb-engineering/experimentation-measurement-for-search-engine-optimization-b64136629760) — Written by the data scientist on the Airbnb SEO team. 3) Pinterest Engineering Blog (https://medium.com/pinterest-engineering/demystifying-seo-with-experiments-a183b325cf4c) — Original blog post about Pinterest's SEO experimentation framework. Airbnb's framework is heavily borrowed from this, with data scientists and engineers from Airbnb walking over to the Pinterest office for knowledge sharing.

### Similarweb for Competitive SEO Analysis (Kickstarting and scaling a consumer business—Step 6: SCALE: Build your growth engine)
Tool recommended to check if competitors are succeeding with SEO, as a signal that SEO could work for you

How it works: Use Similarweb (similarweb.com) to check if your competitors are having success with SEO. If they are, this is one indicator that SEO could be a viable growth engine for your product.

