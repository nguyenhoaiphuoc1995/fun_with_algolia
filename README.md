1) Prequisite:
- There are many search engines that you can use to scale up your system full-text search ability and search-speed optimization, for example Algolia. This topics is to express my experience of using Algolia.

- The first question that you'd probaly have in mind is: Why Algolia?
a) Enable your system to have fulltext-search ability like Google with customized options.
b) Superfast speed, even if your amount is huge (i'm talking about millions of records). Normally, the response time of Algolia is around 200ms, this is the standard API response time based on this article: https://sematext.com/glossary/response-time/#:~:text=Standards%3A%20What%20Is%20a%20Good%20Response%20Time&text=A%20web%20response%20time%20ranging,and%20needs%20to%20be%20fixed.
c) Cost-saving: The unit-system of Algolia is infact cheaper than many other services, like Google that would take you about 7$/1000 requests, Algolia only takes 1$/ 1000 requests, and also, Algolia gives you a free-of-charge tier for 10,000 search + 10,000 recommend requests/mo and 10,000 records/mo
d) Big community support: You can take a look at the huge amount of weekly download for this module on npm https://www.npmjs.com/package/algoliasearch