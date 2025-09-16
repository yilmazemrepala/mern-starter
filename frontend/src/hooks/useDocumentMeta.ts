import { useEffect } from "react";

interface DocumentMetaOptions {
	title: string;
	description?: string;
	keywords?: string[];
	favicon?: string;
	image?: string;
	siteName?: string;
	separator?: string;
	url?: string;
	type?: string;
	author?: string;
	robots?: string;
	canonical?: string;
}

export const useDocumentMeta = (options: DocumentMetaOptions): void => {
	const {
		title,
		description,
		keywords,
		favicon,
		image,
		siteName,
		separator = "|",
		url,
		type = "website",
		author,
		robots = "index, follow",
		canonical,
	} = options;

	useEffect(() => {
		// Set the document title
		if (title) {
			document.title = title;
		}

		if (siteName) {
			document.title = `${title} ${separator} ${siteName}`;
		}

		// Set the meta description
		if (description) {
			let metaDescription = document.querySelector('meta[name="description"]');
			if (!metaDescription) {
				metaDescription = document.createElement("meta");
				metaDescription.setAttribute("name", "description");
				document.head.appendChild(metaDescription);
			}
			metaDescription.setAttribute("content", description);
		}

		// Set the meta keywords
		if (keywords && keywords.length > 0) {
			let metaKeywords = document.querySelector('meta[name="keywords"]');
			if (!metaKeywords) {
				metaKeywords = document.createElement("meta");
				metaKeywords.setAttribute("name", "keywords");
				document.head.appendChild(metaKeywords);
			}
			metaKeywords.setAttribute("content", keywords.join(", "));
		}

		// Set the favicon
		if (favicon) {
			let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
			if (!link) {
				link = document.createElement("link");
				link.rel = "icon";
				document.head.appendChild(link);
			}
			link.href = favicon;
		}

		// Set the site image (og:image)
		if (image) {
			let metaImage = document.querySelector('meta[property="og:image"]');
			if (!metaImage) {
				metaImage = document.createElement("meta");
				metaImage.setAttribute("property", "og:image");
				document.head.appendChild(metaImage);
			}
			metaImage.setAttribute("content", image);
		}

		// Set robots meta tag
		if (robots) {
			let metaRobots = document.querySelector('meta[name="robots"]');
			if (!metaRobots) {
				metaRobots = document.createElement("meta");
				metaRobots.setAttribute("name", "robots");
				document.head.appendChild(metaRobots);
			}
			metaRobots.setAttribute("content", robots);
		}

		// Set author meta tag
		if (author) {
			let metaAuthor = document.querySelector('meta[name="author"]');
			if (!metaAuthor) {
				metaAuthor = document.createElement("meta");
				metaAuthor.setAttribute("name", "author");
				document.head.appendChild(metaAuthor);
			}
			metaAuthor.setAttribute("content", author);
		}

		// Set canonical URL
		if (canonical) {
			let linkCanonical = document.querySelector(
				'link[rel="canonical"]'
			) as HTMLLinkElement;
			if (!linkCanonical) {
				linkCanonical = document.createElement("link");
				linkCanonical.rel = "canonical";
				document.head.appendChild(linkCanonical);
			}
			linkCanonical.href = canonical;
		}

		// Set Open Graph meta tags
		const ogTags = [
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: type },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ property: "og:site_name", content: siteName },
		];

		ogTags.forEach(({ property, content }) => {
			if (content) {
				let metaOg = document.querySelector(`meta[property="${property}"]`);
				if (!metaOg) {
					metaOg = document.createElement("meta");
					metaOg.setAttribute("property", property);
					document.head.appendChild(metaOg);
				}
				metaOg.setAttribute("content", content);
			}
		});

		// Set Twitter Card meta tags
		const twitterTags = [
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: image },
		];

		twitterTags.forEach(({ name, content }) => {
			if (content) {
				let metaTwitter = document.querySelector(`meta[name="${name}"]`);
				if (!metaTwitter) {
					metaTwitter = document.createElement("meta");
					metaTwitter.setAttribute("name", name);
					document.head.appendChild(metaTwitter);
				}
				metaTwitter.setAttribute("content", content);
			}
		});
	}, [
		title,
		description,
		keywords,
		favicon,
		image,
		siteName,
		separator,
		url,
		type,
		author,
		robots,
		canonical,
	]);
};
