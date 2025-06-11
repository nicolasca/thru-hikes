/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.outsideonline.com",
      "img.peapix.com",
      "www.halfwayanywhere.com",
      "images.squarespace-cdn.com",
      "img.oastatic.com",
      "www.rutadelosparques.org",
      // Previous new domains (might be duplicates, but it's safe to list them again if unsure)
      "www.greatdividetrail.com", // This one is replaced, but if other images used it, keep it.
      "www.visitarizona.com", // This one is replaced, but if other images used it, keep it.
      "upload.wikimedia.org",
      "www.via-alpina.org", // This one is replaced, but if other images used it, keep it.
      "www.rai.it", // This one is replaced, but if other images used it, keep it.
      "www.michinokutrail.com", // This one is replaced, but if other images used it, keep it.
      "www.outsideonline.com", // This one is now the Arizona Trail source

      // NEW HOSTNAMES ADDED BELOW:
      "pushbikegirl.com", // For Great Divide Trail
      "travelingnaturejournal.com", // For Hayduke Trail
      "cdn.prod.website-files.com", // For Sentiero Italia
      "rawtravel.com", // For Michinoku Coastal Trail
      "googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
