- There are many search engines that you can use to scale up your system full-text search ability and search-speed optimization, for example Algolia. This topics is to express my experience of using Algolia.

- So, why Algolia?
a) Enable your system to have fulltext-search ability like Google with customized options.
b) Superfast speed, even if your amount is huge (i'm talking about millions of records). Normally, the response time of Algolia is around 200ms, this is the standard API response time based on this article: https://sematext.com/glossary/response-time/#:~:text=Standards%3A%20What%20Is%20a%20Good%20Response%20Time&text=A%20web%20response%20time%20ranging,and%20needs%20to%20be%20fixed.
c) Cost-saving: The unit-system of Algolia is infact cheaper than many other services, like Google that would take you about 7$/1000 requests, Algolia only takes 1$/ 1000 requests, and also, Algolia gives you a free-of-charge tier for 10,000 search + 10,000 recommend requests/month and 10,000 records/month.
d) Big community support: You can take a look at the huge amount of weekly download for this module on npm https://www.npmjs.com/package/algoliasearch

- But in the contrast to it's cons are some big cons below:
a) Because this is a service, so you have to pay them for your search requests, current price by the time i write this essay is 1$ for each request after free tier, so you have to be careful with the feature that you attach with Algolia, at least you have to make money out of it

b) You have to give them data so that they can help you search on that and give you back the response. This is something called: Datafeed. https://en.wikipedia.org/wiki/Data_feed . If your system has lots of valueable data that can help you make lots of money out of it, i recommend you not data-feeding it to Algolia, because who knows what they would do with your data, even though they are a service, they might have  some "greed" over your data.

- What is this project about?
a) To show you how the Algolia works and and you can quickly attach these utilities code to your javascript project
b) Show off some popular Customizations of Algolia: 
+ Facets feature.
+ Sorting Feature.
+ Full-text search feature. 
+ Filter feature.

- Where to get JSON data to test?
https://www.mockaroo.com/

c) For revelant sort:
- If you don't heavily focus on the custom ranking point, you should delete the attributes in the tab Configuration => Ranking and Sorting for your system to be able to enable fulltext-search feature.

d) 