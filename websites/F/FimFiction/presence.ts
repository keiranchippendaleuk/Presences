const presence = new Presence({
		clientId: "642719342609432586",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/DctO7hH.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "www.fimfiction.net") {
		if (document.location.pathname === "/")
			presenceData.details = "Viewing home page";
		else if (document.querySelector("#chapter_title")) {
			presenceData.details = `Reading: ${
				document.querySelector(
					"#chapter_format > div.story-page-header > div.inner > div.info-container > div > h1 > a"
				).textContent
			}`;
			presenceData.state = `Chapter: ${
				document.querySelector("#chapter_title").textContent
			}`;
			presenceData.smallImageKey = "reading";
		} else if (document.location.pathname.includes("/story/")) {
			presenceData.details = "Viewing story:";
			presenceData.state = document.querySelector(".story_name").textContent;
			presenceData.smallImageKey = "reading";
		} else if (document.location.pathname.includes("/user/")) {
			presenceData.details = "Viewing user:";
			presenceData.state = document.querySelector(
				"body > div.body-layout > div.body_container > div:nth-child(4) > div > div.user-page-header > div > div.info-container > h1 > a"
			).textContent;
		} else if (document.location.pathname.includes("/tag/")) {
			presenceData.details = "Viewing tag:";
			presenceData.state = document.querySelector(
				"body > div.body-layout > div.body_container > div:nth-child(4) > div > div > form > div > div > div.tag-header-inner > div.info > h1 > a"
			).textContent;
		} else if (document.location.pathname.includes("/blog/")) {
			presenceData.details = "Reading blog post:";
			title =
				document.querySelector(
					"body > div.body-layout > div.body_container > div:nth-child(4) > div.content.mobile-no-margin > div.two-columns > div.left > div > div.content_box.blog-post-content-box > h1 > span"
				) ||
				document.querySelector(
					"body > div.body-layout > div.body_container > div:nth-child(4) > div > div.content.mobile-no-margin > div > div.left > div > div.content_box.blog-post-content-box > h1 > span > a"
				);
			presenceData.state = title.textContent;
			presenceData.smallImageKey = "reading";
		} else if (document.location.pathname.includes("/news/story-reviews"))
			presenceData.details = "Viewing story revies";
		else if (document.location.pathname.includes("/group/")) {
			presenceData.details = "Viewing group:";
			presenceData.state = document.querySelector(".group_name").textContent;
		} else if (document.location.pathname.includes("/groups"))
			presenceData.details = "Viewing all groups";
		else if (document.location.pathname.includes("/stories"))
			presenceData.details = "Browsing stories...";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
