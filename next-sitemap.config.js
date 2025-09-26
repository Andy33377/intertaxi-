/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://intertaxi.vercel.app",
  generateRobotsTxt: false,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*"],
};
